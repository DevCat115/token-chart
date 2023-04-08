import express from 'express';
import cors from 'cors';

import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import ws from 'ws';
import { Server } from 'socket.io'; // Import Socket.IO
import { createContext } from './context';
import { appRouter } from './routers';
import { apiPort, apiHostUrlPrefix, hostUrl, wsApiHostUrl } from '@/lib/constants';
// import { DefinedWebsocketApiTokenClient } from '@/lib/defined/websocket/clients/token-client';
import { BarUpdateWebsocket } from '@/lib/defined/BarUpdateWebsocket/BarUpdateWebsocket';

const app = express();

app.use(cors({ origin: hostUrl }));

app.use(
  apiHostUrlPrefix,
  createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

const server = app.listen(apiPort);
const wss = new ws.Server({ server });

const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext
});

wss.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});

// ------- socket.io -------------
const io = new Server(server, {
  cors: {
    origin: hostUrl,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`➕➕ socket.io Connection (${Object.keys(io.sockets.sockets).length})`);
  let wsBarUpdate = null;

  socket.on('SubAdd', (message) => {
    const { resolution, pairId } = message;
    console.log('SubAdd', message);

    wsBarUpdate = new BarUpdateWebsocket(
      pairId,
      (message) => {
        const data = message?.payload?.data;
        socket.emit('m', {
          data,
          resolution,
          pairId,
        });
      },
    );
  });

  socket.on('SubRemove', (message) => {
    if (wsBarUpdate) {
      wsBarUpdate.close();
    }
  });

  socket.on('disconnect', () => {
    if (wsBarUpdate) {
      wsBarUpdate.close();
    }
    console.log(`➖➖ socket.io Connection (${Object.keys(io.sockets.sockets).length})`);
  });
});

// ------- end of socket.io -------------

console.log(`✅ WebSocket Server listening on ${wsApiHostUrl}`);
process.on('SIGTERM', () => {
  console.log('SIGTERM');
  handler.broadcastReconnectNotification();
  wss.close();
  io.close();
});
