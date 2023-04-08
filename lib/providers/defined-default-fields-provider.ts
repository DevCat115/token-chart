export class DefinedDefaultFieldsProvider {
  public static getFilterTokenFields() {
    return `{
      priceUSD,
      liquidity,
      marketCap,
      change1,
      change4,
      change12,
      change24,
      volume1,
      volume4,
      volume12,
      volume24,
      uniqueTransactions1,
      uniqueTransactions4,
      uniqueTransactions12,
      uniqueTransactions24,
      exchanges {
        name,
        tradeUrl,
        exchangeVersion,
        iconUrl
      },
      createdAt,
      token {
        name,
        id,
        address,
        symbol,
        networkId,
        info {
          imageLargeUrl,
          imageSmallUrl,
          imageThumbUrl,
        },
        socialLinks {
          website,
          facebook,
          twitter,
          github,
          telegram,
          discord,
          whitepaper,
          youtube,
          reddit
        },
        explorerData {
          divisor
          blueCheckmark
          description
          tokenType
        }
      }
    }`;
  }
  public static getDetailedPairStatsFields() {
    return `{
      bucketCount,
      lastTransaction,
      networkId,
      pair {
        address,
        createdAt,
        exchangeHash,
        fee,
        id,
        networkId,
        tickSpacing,
        token0,
        token0Data {
          address,
          name ,
          networkId,
          socialLinks {
            bitcointalk,
            blog,
            coingecko,
            coinmarketcap,
            discord,
            email,
            facebook,
            github,
            instagram,
            linkedin,
            reddit,
            slack,
            telegram,
            twitch,
            twitter,
            website,
            wechat,
            whitepaper,
            youtube,
          },
          symbol,
          totalSupply,
          info {
            circulatingSupply,
            isScam,
            imageLargeUrl,
            imageSmallUrl,
            imageThumbUrl 
          }
        },
        token1,
        token1Data {
          address,
          name ,
          networkId,
          socialLinks {
            bitcointalk,
            blog,
            coingecko,
            coinmarketcap,
            discord,
            email,
            facebook,
            github,
            instagram,
            linkedin,
            reddit,
            slack,
            telegram,
            twitch,
            twitter,
            website,
            wechat,
            whitepaper,
            youtube,
          },
          symbol,
          totalSupply,
          info {
            circulatingSupply,
            isScam,
            imageLargeUrl,
            imageSmallUrl,
            imageThumbUrl 
          }
        }
      }
      pairAddress,
      queryTimestamp
      stats_day1 {
        statsNonCurrency {
          buyers {
            change,
            currentValue,
            previousValue
          },
          buys {
            change,
            currentValue,
            previousValue
          },
          sellers {
            change,
            currentValue,
            previousValue
          },
          sells {
            change,
            currentValue,
            previousValue
          },
          traders {
            change,
            currentValue,
            previousValue
          },
          transactions {
            change,
            currentValue,
            previousValue
          }
        },
        statsUsd {
          buyVolume {
            change,
            currentValue,
            previousValue
          }
          close {
            change,
            currentValue,
            previousValue
          }
          highest {
            change,
            currentValue,
            previousValue
          }
          liquidity {
            change,
            currentValue,
            previousValue
          }
          lowest {
            change,
            currentValue,
            previousValue
          }
          open {
            change,
            currentValue,
            previousValue
          }
          sellVolume {
            change,
            currentValue,
            previousValue
          }
          volume {
            change,
            currentValue,
            previousValue
          }
        },
        timestamps {
          start
          end
        }
      },
      stats_hour1 {
        statsNonCurrency {
          buyers {
            change,
            currentValue,
            previousValue
          },
          buys {
            change,
            currentValue,
            previousValue
          },
          sellers {
            change,
            currentValue,
            previousValue
          },
          sells {
            change,
            currentValue,
            previousValue
          },
          traders {
            change,
            currentValue,
            previousValue
          },
          transactions {
            change,
            currentValue,
            previousValue
          }
        },
        statsUsd {
          buyVolume {
            change,
            currentValue,
            previousValue
          }
          close {
            change,
            currentValue,
            previousValue
          }
          highest {
            change,
            currentValue,
            previousValue
          }
          liquidity {
            change,
            currentValue,
            previousValue
          }
          lowest {
            change,
            currentValue,
            previousValue
          }
          open {
            change,
            currentValue,
            previousValue
          }
          sellVolume {
            change,
            currentValue,
            previousValue
          }
          volume {
            change,
            currentValue,
            previousValue
          }
        },
        timestamps {
          start
          end
        }
      },
      stats_hour4 {
        statsNonCurrency {
          buyers {
            change,
            currentValue,
            previousValue
          },
          buys {
            change,
            currentValue,
            previousValue
          },
          sellers {
            change,
            currentValue,
            previousValue
          },
          sells {
            change,
            currentValue,
            previousValue
          },
          traders {
            change,
            currentValue,
            previousValue
          },
          transactions {
            change,
            currentValue,
            previousValue
          }
        },
        statsUsd {
          buyVolume {
            change,
            currentValue,
            previousValue
          }
          close {
            change,
            currentValue,
            previousValue
          }
          highest {
            change,
            currentValue,
            previousValue
          }
          liquidity {
            change,
            currentValue,
            previousValue
          }
          lowest {
            change,
            currentValue,
            previousValue
          }
          open {
            change,
            currentValue,
            previousValue
          }
          sellVolume {
            change,
            currentValue,
            previousValue
          }
          volume {
            change,
            currentValue,
            previousValue
          }
        },
        timestamps {
          start
          end
        }
      },
      stats_hour12 {
        statsNonCurrency {
          buyers {
            change,
            currentValue,
            previousValue
          },
          buys {
            change,
            currentValue,
            previousValue
          },
          sellers {
            change,
            currentValue,
            previousValue
          },
          sells {
            change,
            currentValue,
            previousValue
          },
          traders {
            change,
            currentValue,
            previousValue
          },
          transactions {
            change,
            currentValue,
            previousValue
          }
        },
        statsUsd {
          buyVolume {
            change,
            currentValue,
            previousValue
          }
          close {
            change,
            currentValue,
            previousValue
          }
          highest {
            change,
            currentValue,
            previousValue
          }
          liquidity {
            change,
            currentValue,
            previousValue
          }
          lowest {
            change,
            currentValue,
            previousValue
          }
          open {
            change,
            currentValue,
            previousValue
          }
          sellVolume {
            change,
            currentValue,
            previousValue
          }
          volume {
            change,
            currentValue,
            previousValue
          }
        },
        timestamps {
          start
          end
        }
      },
      stats_min5 {
        statsNonCurrency {
          buyers {
            change,
            currentValue,
            previousValue
          },
          buys {
            change,
            currentValue,
            previousValue
          },
          sellers {
            change,
            currentValue,
            previousValue
          },
          sells {
            change,
            currentValue,
            previousValue
          },
          traders {
            change,
            currentValue,
            previousValue
          },
          transactions {
            change,
            currentValue,
            previousValue
          }
        },
        statsUsd {
          buyVolume {
            change,
            currentValue,
            previousValue
          }
          close {
            change,
            currentValue,
            previousValue
          }
          highest {
            change,
            currentValue,
            previousValue
          }
          liquidity {
            change,
            currentValue,
            previousValue
          }
          lowest {
            change,
            currentValue,
            previousValue
          }
          open {
            change,
            currentValue,
            previousValue
          }
          sellVolume {
            change,
            currentValue,
            previousValue
          }
          volume {
            change,
            currentValue,
            previousValue
          }
        },
        timestamps {
          start
          end
        }
      }
    }`;
  }
}
