import axios from "axios";
import { parseUnits } from "ethers/lib/utils.js";
import { OneInchQuoteResponse } from "../../../types/oneInch";
import { openOceanQuoteResponse } from "../../../types/openOcean";
import { TokenRoute } from "../../../types/token";
import { oneInchConfig } from "../../utils/constants";
import { getNetworkByChainId } from "../../utils/utils";

interface getSwapQuoteParams extends TokenRoute {
  amountFrom: string;
  gasPrice: string;
}

export const getSwapQuote = async ({
  tokenTo,
  tokenFrom,
  amountFrom,
  gasPrice,
}: getSwapQuoteParams) => {
  const network = getNetworkByChainId(tokenFrom.chainId);

  if (network.supportedDexes.includes("1inch")) {
    const { data } = await axios.get<OneInchQuoteResponse>(
      `https://api.1inch.dev/swap/v5.2/${tokenFrom.chainId}/quote?src=${
        tokenFrom.address
      }&dst=${tokenTo.address}&amount=${parseUnits(
        amountFrom,
        tokenFrom.decimals
      )}&includeGas=true`,

      oneInchConfig
    );

    return data;
  }

  const { data } = await axios.get<openOceanQuoteResponse>(
    `https://open-api.openocean.finance/v3/${tokenFrom.chainId}/quote?inTokenAddress=${tokenFrom.address}&outTokenAddress=${tokenTo.address}&amount=${amountFrom}&gasPrice=${gasPrice}&slippage=1`
  );

  return {
    toAmount: data.data.outAmount,
    gas: +data.data.estimatedGas,
  };
};
