import { io } from 'socket.io-client';
import { httpApiHostUrl } from '@/lib/constants';

const socket = io(httpApiHostUrl);
const channelToSubscription = new Map();

socket.on('connect', () => {
  console.log('[socket] Connected');
});

socket.on('disconnect', (reason) => {
  console.log('[socket] Disconnected:', reason);
});

socket.on('error', (error) => {
  console.log('[socket] Error:', error);
});

socket.on('m', (response) => {
  console.log('[socket] Message:', response);

  const resolution = response.resolution;
  const responseData = response.data;
  const currentResolutionData = responseData?.onBarsUpdated?.aggregates['r'.concat(resolution)];

  if (!currentResolutionData) return;

  const currentChartData = currentResolutionData['usd'];
  const channelString = response.pairId;
  const subscriptionItem = channelToSubscription.get(channelString);

  if (subscriptionItem === undefined) {
    return;
  }
  const lastDailyBar = subscriptionItem.lastDailyBar;
  lastDailyBar && (Math.floor(lastDailyBar.time / 1e3) == currentChartData.t
    ? currentChartData.o = lastDailyBar.open
    : currentChartData.o = lastDailyBar.close);

  const bar = {
    high: currentChartData.h,
    low: currentChartData.l,
    open: currentChartData.o,
    close: currentChartData.c,
    time: 1e3 * currentChartData.t,
    volume: parseFloat(currentChartData.volume)
  };

  subscriptionItem.lastDailyBar = bar;

  // send data to every subscriber of that symbol
  subscriptionItem.handlers.forEach((handler) => handler.callback(bar));
});

function getNextDailyBarTime(barTime) {
  const date = new Date(barTime * 1000);

  date.setDate(date.getDate() + 1);

  return date.getTime() / 1000;
}

export function subscribeOnStream(
  symbolInfo,
  resolution,
  onRealtimeCallback,
  subscribeUID,
  onResetCacheNeededCallback,
  lastDailyBar
) {
  const pairId = symbolInfo.name;
  const channelString = pairId;
  const handler = {
    id: subscribeUID,
    callback: onRealtimeCallback
  };
  let subscriptionItem = channelToSubscription.get(channelString);

  if (subscriptionItem) {
    // already subscribed to the channel, use the existing subscription
    subscriptionItem.handlers.push(handler);
    return;
  }

  subscriptionItem = {
    subscribeUID,
    resolution,
    lastDailyBar,
    handlers: [handler]
  };

  channelToSubscription.set(channelString, subscriptionItem);
  console.log('[subscribeBars]: Subscribe to streaming. Channel:', channelString);
  socket.emit('SubAdd', { resolution, pairId });
}

export function unsubscribeFromStream(subscriberUID: string) {
  // find a subscription with id === subscriberUID
  for (const channelString of channelToSubscription.keys()) {
    const subscriptionItem = channelToSubscription.get(channelString);
    const handlerIndex = subscriptionItem.handlers.findIndex(
      (handler) => handler.id === subscriberUID
    );

    if (handlerIndex !== -1) {
      // remove from handlers
      subscriptionItem.handlers.splice(handlerIndex, 1);

      if (subscriptionItem.handlers.length === 0) {
        // unsubscribe from the channel, if it was the last handler
        console.log('[unsubscribeBars]: Unsubscribe from streaming. Channel:', channelString);
        socket.emit('SubRemove', { subs: [channelString] });
        channelToSubscription.delete(channelString);
        break;
      }
    }
  }
}
