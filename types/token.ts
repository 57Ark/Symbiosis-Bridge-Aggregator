export interface Token {
  chainId: number;
  address: string;
  decimals: number;
  symbol: string;
}

export interface TokenWithPrice extends Token {
  price: number;
}

export interface TokenRoute {
  tokenTo: Token;
  tokenFrom: Token;
}
