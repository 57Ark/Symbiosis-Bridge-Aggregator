export interface Network {
  chainId: number;
  name: string;
  rpc: string;
  explorerName: string;
  explorerAddress: string;
  explorerApi: string;
  coin: string;
  apiKey?: string;
}

export interface GasPrice {
  chainId: number;
  gasPrice: string;
}

export interface CoinPrice {
  chainId: number;
  coinPrice: string;
}
