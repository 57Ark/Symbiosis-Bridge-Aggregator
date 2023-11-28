export interface openOceanQuoteResponse {
  data: { outAmount: string; estimatedGas: string };
}

export interface openOceanSwapResponse {
  data: {
    outAmount: string;
    to: string;
    data: string;
    value: string;
    gasPrice: string;
    estimatedGas: string;
  };
}
