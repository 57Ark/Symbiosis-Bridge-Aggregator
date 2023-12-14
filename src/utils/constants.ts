import { Network } from "../../types/network";
import { Token } from "../../types/token";

require("dotenv").config();

export const WALLET_ADDRESS = process.env.WALLET_ADDRESS ?? "";
export const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";

export const COVALENTHQ_KEY = process.env.COVALENTHQ_KEY ?? "";

export const oneInchConfig = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.ONEINCH_BEARER_TOKEN}`,
  },
};

export const BridgeGasLimit: Record<number, number> = {
  1: 320000,
  56: 320000,
  137: 320000,
  42161: 1240000,
  324: 3500000,
  59144: 320000,
  534352: 320000,
};

export const TOKEN_LIST: Record<string, Token[]> = {
  xdao: [
    {
      chainId: 1,
      address: "0x71eebA415A523F5C952Cc2f06361D5443545Ad28",
      decimals: 18,
      symbol: "XDAO",
    },
    {
      chainId: 56,
      address: "0x71eebA415A523F5C952Cc2f06361D5443545Ad28",
      decimals: 18,
      symbol: "XDAO",
    },
    {
      chainId: 137,
      address: "0x71eebA415A523F5C952Cc2f06361D5443545Ad28",
      decimals: 18,
      symbol: "XDAO",
    },
    {
      chainId: 42161,
      address: "0x71eebA415A523F5C952Cc2f06361D5443545Ad28",
      decimals: 18,
      symbol: "XDAO",
    },
  ],
  sis: [
    {
      chainId: 1,
      address: "0xd38BB40815d2B0c2d2c866e0c72c5728ffC76dd9",
      decimals: 18,
      symbol: "SIS",
    },
    {
      chainId: 56,
      address: "0xF98b660AdF2ed7d9d9D9dAACC2fb0CAce4F21835",
      decimals: 18,
      symbol: "SIS",
    },
    {
      chainId: 42161,
      address: "0x9E758B8a98a42d612b3D38B66a22074DC03D7370",
      decimals: 18,
      symbol: "SIS",
    },
    {
      chainId: 324,
      address: "0xdd9f72afED3631a6C85b5369D84875e6c42f1827",
      decimals: 18,
      symbol: "SIS",
    },
    {
      chainId: 59144,
      address: "0x6EF95B6f3b0F39508e3E04054Be96D5eE39eDE0d",
      decimals: 18,
      symbol: "SIS",
    },
    {
      chainId: 534352,
      address: "0x1467b62A6AE5CdcB10A6a8173cfe187DD2C5a136",
      decimals: 18,
      symbol: "SIS",
    },
  ],
};

export const USDC_TOKEN: Token[] = [
  {
    chainId: 1,
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimals: 6,
    symbol: "USDC",
  },
  {
    chainId: 56,
    address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    decimals: 18,
    symbol: "USDC",
  },
  {
    chainId: 137,
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    decimals: 6,
    symbol: "USDC.e",
  },
  {
    chainId: 42161,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    decimals: 6,
    symbol: "USDC",
  },
  {
    chainId: 324,
    address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
    decimals: 6,
    symbol: "USDC",
  },
  {
    chainId: 59144,
    address: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
    decimals: 6,
    symbol: "USDC.e",
  },
  {
    chainId: 534352,
    address: "0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4",
    decimals: 6,
    symbol: "USDC",
  },
];

export const OpenoceanRouters: Record<number, string> = {
  1: "0x6352a56caadc4f1e25cd6c75970fa768a3304e64",
  56: "0x6352a56caadc4f1e25cd6c75970fa768a3304e64",
  137: "0x6352a56caadc4f1e25cd6c75970fa768a3304e64",
  42161: "0x6352a56caadc4f1e25cd6c75970fa768a3304e64",
  324: "0x36A1aCbbCAfca2468b85011DDD16E7Cb4d673230",
  59144: "0x6352a56caadc4f1e25cd6c75970fa768a3304e64",
  534352: "0x6352a56caadc4f1e25cd6c75970fa768a3304e64",
};

export const NETWORKS: Network[] = [
  {
    name: "Ethereum",
    rpc: "https://eth-mainnet.nodereal.io/v1/e3b672edf8fa41d997d714452db93c67",
    chainId: 1,
    explorerName: "Etherscan",
    explorerAddress: "https://etherscan.io",
    explorerApi: "https://api.etherscan.io/api",
    coin: "ETH",
    apiKey: process.env.ETHERSCAN_KEY ?? "",
    supportedDexes: ["1inch", "openocean"],
  },
  {
    chainId: 56,
    name: "BNB Chain",
    rpc: "https://bsc-mainnet.nodereal.io/v1/e8d837bcef6542649a53820a0db750fa",
    explorerName: "BscScan",
    explorerAddress: "https://bscscan.com",
    explorerApi: "https://api.bscscan.com/api",
    coin: "BNB",
    apiKey: process.env.BSCSCAN_KEY ?? "",
    supportedDexes: ["1inch", "openocean"],
  },
  {
    chainId: 137,
    name: "Polygon",
    rpc: "https://polygon-mainnet.nodereal.io/v1/4760050f989e48f798b5c084d3eaae8f",
    explorerName: "PolygonScan",
    explorerAddress: "https://polygonscan.com",
    explorerApi: "https://api.polygonscan.com/api",
    coin: "Matic",
    apiKey: process.env.POLYGONSCAN_KEY ?? "",
    supportedDexes: [
      // Currently removed due to liqudity troubles
      // "1inch",
      "openocean",
    ],
  },
  {
    chainId: 42161,
    name: "Arbitrum",
    rpc: "https://arb1.arbitrum.io/rpc",
    explorerName: "Arbiscan",
    explorerAddress: "https://arbiscan.io",
    explorerApi: "https://api.arbiscan.io/api",
    coin: "ETH",
    apiKey: process.env.ARBISCAN_KEY ?? "",
    supportedDexes: ["1inch", "openocean"],
  },
  {
    chainId: 324,
    name: "ZkSync Era",
    rpc: "https://mainnet.era.zksync.io",
    explorerName: "zkSync Sacnner",
    explorerAddress: "https://explorer.zksync.io",
    explorerApi: "https://block-explorer-api.mainnet.zksync.io/api",
    coin: "ETH",
    supportedDexes: ["1inch", "openocean"],
  },

  {
    chainId: 59144,
    name: "Linea",
    rpc: "https://1rpc.io/linea",
    explorerName: "LineaScan",
    explorerAddress: "https://lineascan.build",
    explorerApi: "https://api.lineascan.build/api",
    coin: "ETH",
    apiKey: process.env.LINEASCAN_KEY ?? "",
    supportedDexes: ["openocean"],
  },
  {
    chainId: 534352,
    name: "Scroll",
    rpc: "https://rpc.scroll.io",
    explorerName: "ScrollScan",
    explorerAddress: "https://scrollscan.com/",
    explorerApi: "https://api.scrollscan.com/api",
    coin: "ETH",
    apiKey: process.env.SCROLLSCAN_KEY ?? "",
    supportedDexes: ["openocean"],
  },
];
