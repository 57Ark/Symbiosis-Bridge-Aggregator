import { Network } from "../../types/network";
import { Token } from "../../types/token";

require("dotenv").config();

export const WALLET_ADDRESS = process.env.WALLET_ADDRESS ?? "";
export const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";

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
];

export const NETWORKS: Network[] = [
  {
    name: "Ethereum",
    rpc: "https://eth-mainnet.nodereal.io/v1/e3b672edf8fa41d997d714452db93c67",
    chainId: 1,
    explorerName: "Etherscan",
    explorerAddress: "etherscan.io",
    coin: "ETH",
    apiKey: process.env.ETHERSCAN_KEY ?? "",
  },
  {
    chainId: 56,
    name: "BNB Chain",
    rpc: "https://bsc-mainnet.nodereal.io/v1/e8d837bcef6542649a53820a0db750fa",
    explorerName: "BscScan",
    explorerAddress: "bscscan.com",
    coin: "BNB",
    apiKey: process.env.BSCSCAN_KEY ?? "",
  },
  {
    chainId: 137,
    name: "Polygon",
    rpc: "https://polygon-mainnet.nodereal.io/v1/4760050f989e48f798b5c084d3eaae8f",
    explorerName: "PolygonScan",
    explorerAddress: "polygonscan.com",
    coin: "Matic",
    apiKey: process.env.POLYGONSCAN_KEY ?? "",
  },
  {
    chainId: 42161,
    name: "Arbitrum",
    rpc: "https://arb1.arbitrum.io/rpc",
    explorerName: "Arbiscan",
    explorerAddress: "arbiscan.io",
    coin: "ETH",
    apiKey: process.env.ARBISCAN_KEY ?? "",
  },
];
