export interface OneInchQuoteResponse {
  toAmount: string;
  gas: number;
}

export interface OneInchSwapResponse {
  toAmount: string;
  tx: {
    to: string;
    data: string;
    value: string;
    gasPrice: string;
    gas: number;
  };
}
