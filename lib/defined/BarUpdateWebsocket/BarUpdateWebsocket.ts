import WebSocket from 'ws';
class BarUpdateWebsocket {
  private ws: WebSocket;
  private pairId: string;
  private messageHandler: () => void;

  constructor(pairId: string, messageHandler: () => void) {
    this.ws = new WebSocket(`wss://realtime-api.defined.fi/graphql`, 'graphql-transport-ws');
    this.pairId = pairId;
    this.messageHandler = messageHandler;
    this.ws.onopen = () => {
      console.log('[onOpen BarUpdateWebsocket] to the realtime Defined Websocket...');
      this.ws.send(
        JSON.stringify({
          type: 'connection_init',
          payload: {
            Authorization: process.env.NEXT_PUBLIC_DEFINED_API_KEY,
          },
        }),
      );
    };

    this.ws.onclose = () => {
      console.log('[onClose BarUpdateWebsocket] to the realtime Defined Websocket...');
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'connection_ack') {
        this.ws.send(
          JSON.stringify({
            id: 'my_id',
            type: 'subscribe',
            payload: {
              // extensions: {},
              operationName: 'UpdateAggregateBatch',
              query:
                'subscription UpdateAggregateBatch($pairId: String, $quoteToken: QuoteToken, $statsType: TokenPairStatisticsType) {\n  onBarsUpdated(pairId: $pairId, quoteToken: $quoteToken, statsType: $statsType) {\n    eventSortKey\n    networkId\n    pairAddress\n    pairId\n    timestamp\n    quoteToken\n    aggregates {\n      ...ResolutionBarFields\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment ResolutionBarFields on ResolutionBarData {\n  r1S {\n    ...CurrencyBarFields\n    __typename\n  }\n  r5S {\n    ...CurrencyBarFields\n    __typename\n  }\n  r15S {\n    ...CurrencyBarFields\n    __typename\n  }\n  r1 {\n    ...CurrencyBarFields\n    __typename\n  }\n  r5 {\n    ...CurrencyBarFields\n    __typename\n  }\n  r15 {\n    ...CurrencyBarFields\n    __typename\n  }\n  r30 {\n    ...CurrencyBarFields\n    __typename\n  }\n  r60 {\n    ...CurrencyBarFields\n    __typename\n  }\n  r240 {\n    ...CurrencyBarFields\n    __typename\n  }\n  r720 {\n    ...CurrencyBarFields\n    __typename\n  }\n  r1D {\n    ...CurrencyBarFields\n    __typename\n  }\n  r7D {\n    ...CurrencyBarFields\n    __typename\n  }\n  __typename\n}\n\nfragment CurrencyBarFields on CurrencyBarData {\n  t\n  usd {\n    ...IndividualBarFields\n    __typename\n  }\n  token {\n    ...IndividualBarFields\n    __typename\n  }\n  __typename\n}\n\nfragment IndividualBarFields on IndividualBarData {\n  t\n  o\n  h\n  l\n  c\n  volume\n  volumeNativeToken\n  buys\n  buyers\n  buyVolume\n  sells\n  sellers\n  sellVolume\n  liquidity\n  traders\n  transactions\n  __typename\n}',
              variables: {
                pairId: this.pairId,
                quoteToken: 'token0',
                statsType: 'UNFILTERED',
              },
            },
          }),
        );
      } else {
        console.log('message', data);
        // @ts-ignore
        this.messageHandler(data);
      }
    };
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export { BarUpdateWebsocket };
