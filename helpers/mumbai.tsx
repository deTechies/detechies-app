export const polygonMumbai = {
    id: 80_001,
    name: 'Polygon Mumbai',
    network: 'maticmum',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: {
      alchemy: {
        http: ['https://polygon-mumbai.g.alchemy.com/v2'],
        webSocket: ['wss://polygon-mumbai.g.alchemy.com/v2'],
      },
      infura: {
        http: ['https://polygon-mumbai.infura.io/v3'],
        webSocket: ['wss://polygon-mumbai.infura.io/ws/v3'],
      },
      default: {
        http: [
          'https://polygon-mumbai.g.alchemy.com/v2/-XNN-b2CSYNsv81BRreA7wgYVz8iiQjC',
        ],
      },
      public: {
        http: ['https://polygon-mumbai-bor.publicnode.com	'],
      },
    },
    blockExplorers: {
      etherscan: {
        name: 'PolygonScan',
        url: 'https://mumbai.polygonscan.com',
      },
      default: {
        name: 'PolygonScan',
        url: 'https://mumbai.polygonscan.com',
      },
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 25770160,
      },
    },
    testnet: true,
  } as const satisfies any;