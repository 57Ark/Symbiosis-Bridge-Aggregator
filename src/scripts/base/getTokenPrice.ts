import axios from "axios";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import { OneInchQuoteResponse } from "../../../types/oneInch";
import { Token, TokenWithPrice } from "../../../types/token";
import { oneInchConfig } from "../../utils/constants";
import { getUsdcByChainId } from "../../utils/utils";

export const getTokenPrice = async ({
  address,
  chainId,
  decimals,
  symbol,
}: Token) => {
  const usdc = getUsdcByChainId(chainId);

  const { data } = await axios.get<OneInchQuoteResponse>(
    `https://api.1inch.dev/swap/v5.2/${chainId}/quote?src=${
      usdc.address
    }&dst=${address}&amount=${parseUnits("1", usdc.decimals)}&includeGas=true`,
    oneInchConfig
  );

  return {
    chainId: +chainId,
    address,
    symbol,
    decimals,
    price: 1 / +formatUnits(data.toAmount, decimals),
  } as TokenWithPrice;
};
