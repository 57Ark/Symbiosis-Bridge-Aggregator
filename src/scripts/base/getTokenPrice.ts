import axios from "axios";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import { OneInchQuoteResponse } from "../../../types/oneInch";
import { openOceanQuoteResponse } from "../../../types/openOcean";
import { Token, TokenWithPrice } from "../../../types/token";
import { oneInchConfig } from "../../utils/constants";
import { getNetworkByChainId, getUsdcByChainId } from "../../utils/utils";

export const getTokenPrice = async ({
  address,
  chainId,
  decimals,
  symbol,
  gasPrice,
}: Token & { gasPrice: string }) => {
  const network = getNetworkByChainId(chainId);
  const usdc = getUsdcByChainId(chainId);
  if (network.supportedDexes.includes("1inch")) {
    const { data } = await axios.get<OneInchQuoteResponse>(
      `https://api.1inch.dev/swap/v5.2/${chainId}/quote?src=${
        usdc.address
      }&dst=${address}&amount=${parseUnits(
        "100",
        usdc.decimals
      )}&includeGas=true`,
      oneInchConfig
    );

    return {
      chainId: +chainId,
      address,
      symbol,
      decimals,
      price: 100 / +formatUnits(data.toAmount, decimals),
    } as TokenWithPrice;
  }

  const { data } = await axios.get<openOceanQuoteResponse>(
    `https://open-api.openocean.finance/v3/${chainId}/quote?inTokenAddress=${usdc.address}&outTokenAddress=${address}&amount=100&gasPrice=${gasPrice}&slippage=1`
  );

  return {
    chainId: +chainId,
    address,
    symbol,
    decimals,
    price: 100 / +formatUnits(data.data.outAmount, decimals),
  } as TokenWithPrice;
};
