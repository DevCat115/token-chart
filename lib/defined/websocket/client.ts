import { createClient, Client, SubscribePayload } from 'graphql-ws';
import { DefinedApiResponse, WebsocketSink } from '../types';
import ws from 'ws';

class DefinedWebsocketApiClient {
  private static instance: DefinedWebsocketApiClient;
  public client!: Client;

  constructor() {
    this.client = createClient({
      webSocketImpl: ws,
      url: process.env.NEXT_PUBLIC_DEFINED_WEBSOCKET_API_URL ?? '',
      retryAttempts: 10,
      lazy: true,
      lazyCloseTimeout: 20000,
      retryWait: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 3000));
      },
      connectionParams: {
        Authorization: process.env.NEXT_PUBLIC_DEFINED_WEBSOCKET_API_KEY ?? '',
      },
    });

    this.client.on('connecting', () => {
      console.log('[Connecting] to the Defined Websocket...');
    });

    this.client.on('connected', () => {
      console.log('[Connected] to the Defined Websocket');
    });

    this.client.on('closed', () => {
      console.log('[Closed] Defined Websocket Connection');
    });

    this.client.on('error', (err) => {
      console.log('[Error] in the Defined Websocket', err);
    });
  }

  public subscribe<T>(operationName: string, payload: SubscribePayload, sink: WebsocketSink<T>) {
    return this.client.subscribe<DefinedApiResponse<T>>(payload, {
      next: (data) => sink.next(data?.data?.[operationName] ?? ({} as T)),
      error: (error: unknown) => sink.error && sink.error(error),
      complete: () => sink.complete && sink.complete(),
    });
  }
}

export { DefinedWebsocketApiClient };
