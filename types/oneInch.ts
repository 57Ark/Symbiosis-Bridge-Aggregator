export interface OneInchQuoteResponse {
  toAmount: string;
  gas: number;
}

export interface OneInchSwapResponse extends OneInchQuoteResponse {
  tx: {
    to: string;
    data: string;
    value: string;
    gasPrice: string;
    gas: number;
  };
}
