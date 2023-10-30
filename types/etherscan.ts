export interface EtherscanResponse<T> {
  result: T;
  status: string;
  message: string;
}

export interface GasPrice {
  LastBlock: string;
  SafeGasPrice: string;
  ProposeGasPrice: string;
  FastGasPrice: string;
  suggestBaseFee: string;
  gasUsedRatio: string;
}
