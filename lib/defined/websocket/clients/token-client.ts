import { DefinedOnPairMetadataUpdated } from '../../schema/websocket/defined-onpairmetadataupdated-schema';
import { PairId, WebsocketSink } from '../../types';
import { DefinedWebsocketApiClient } from '../client';
import { DefinedOnPriceUpdate } from '../../schema/websocket/defined-on-price-updated.schema';
import { DefinedOnBarsUpdated } from '../../schema/websocket/defined-on-bars-updated.schema';

export class DefinedWebsocketApiTokenClient {
  public client!: DefinedWebsocketApiClient;

  constructor(client: DefinedWebsocketApiClient = new DefinedWebsocketApiClient()) {
    this.client = client;
  }

  public onPairMetadataUpdated(pairId: PairId, sink: WebsocketSink<DefinedOnPairMetadataUpdated>) {
    const operationName = 'onPairMetadataUpdated';

    return this.client.subscribe<DefinedOnPairMetadataUpdated>(
      operationName,
      {
        query: `subscription OnPairMetadataUpdated($id: String) {
                ${operationName}(id: $id) {
                    id
                    exchangeId
                    pairAddress
                    liquidity
                    liquidityToken
                    nonLiquidityToken
                    quoteToken
                    statsType
                    priceChange1
                    priceChange4
                    priceChange12
                    priceChange24
                    volume1
                    volume4
                    volume12
                    volume24
                    price
                    token0 {
                        address
                        decimals
                        name
                        networkId
                        pooled
                        price
                        symbol
                    }
                    token1 {
                        address
                        decimals
                        name
                        networkId
                        pooled
                        price
                        symbol
                    }
                }
            }`,
        variables: {
          id: pairId,
        },
      },
      sink,
    );
  }

  public onPriceUpdated(
    tokenAddress: string,
    networkId: number,
    sink: WebsocketSink<DefinedOnPriceUpdate>,
  ) {
    const operationName = 'onPriceUpdated';

    return this.client.subscribe<DefinedOnPriceUpdate>(
      operationName,
      {
        query: `subscription OnPriceUpdated($tokenAddress: String, $networkId: Int) {
          ${operationName}(address: $tokenAddress, networkId: $networkId) {
            priceUsd
            timestamp
          }
        }
      `,
        variables: {
          tokenAddress,
          networkId,
        },
      },
      sink,
    );
  }

  public OnBarsUpdated(
    pairId: string,
    sink: WebsocketSink<DefinedOnBarsUpdated>,
  ) {
    const operationName = 'onBarsUpdated';

    return this.client.subscribe<DefinedOnBarsUpdated>(
      operationName,
      {
        query: `subscription OnBarsUpdated($pairId: String) {
          ${operationName}(pairId: $pairId, quoteToken: token1) {
            eventSortKey
            networkId
            pairAddress
            pairId
            timestamp
            quoteToken
            aggregates {
            r1 {
              t
              usd {
                t
                o
                h
                l
                c
                volume
              }
              token {
                t
                o
                h
                l
                c
                volume
              }
            }
            r5 {
              t
              usd {
                t
                o
                h
                l
                c
                volume
              }
              token {
                t
                o
                h
                l
                c
                volume
              }
            }
            r15 {
              t
              usd {
                t
                o
                h
                l
                c
                volume
              }
              token {
                t
                o
                h
                l
                c
                volume
              }
            }
            r30 {
              t
              usd {
                t
                o
                h
                l
                c
                volume
              }
              token {
                t
                o
                h
                l
                c
                volume
              }
            }
            r60 {
              t
              usd {
                t
                o
                h
                l
                c
                volume
              }
              token {
                t
                o
                h
                l
                c
                volume
              }
            }
            r240 {
              t
              usd {
                t
                o
                h
                l
                c
                volume
              }
              token {
                t
                o
                h
                l
                c
                volume
              }
            }
            r720 {
              t
              usd {
                t
                o
                h
                l
                c
                volume
              }
              token {
                t
                o
                h
                l
                c
                volume
              }
            }
            r1D {
              t
              usd {
                t
                o
                h
                l
                c
                volume
              }
              token {
                t
                o
                h
                l
                c
                volume
              }
            }
            r7D {
              t
              usd {
                t
                o
                h
                l
                c
                volume
              }
              token {
                t
                o
                h
                l
                c
                volume
              }
            }
          }
        }
      `,
        variables: {
          pairId,
        },
      },
      sink,
    );
  }
}
