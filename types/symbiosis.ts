interface SymbiosisAmountInUsd {
  address: string;
  amount: string;
  chainId: number;
  decimals: number;
}

interface SymbiosisTx {
  chainId: number;
  data: string;
  to: string;
  value: string;
}

export interface SymbiosisExactInResponse {
  fee: SymbiosisAmountInUsd;
  priceImpact: string;
  tokenAmountOut: SymbiosisAmountInUsd;
  tx: SymbiosisTx;
  amountInUsd: SymbiosisAmountInUsd;
  approveTo: string;
}
