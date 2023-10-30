import axios from "axios";
import { parseUnits } from "ethers/lib/utils.js";
import { OneInchQuoteResponse } from "../../../types/oneInch";
import { TokenRoute } from "../../../types/token";
import { oneInchConfig } from "../../utils/constants";

interface getSwapQuoteParams extends TokenRoute {
  amountFrom: string;
}

export const getSwapQuote = async ({
  tokenTo,
  tokenFrom,
  amountFrom,
}: getSwapQuoteParams) => {
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
};
