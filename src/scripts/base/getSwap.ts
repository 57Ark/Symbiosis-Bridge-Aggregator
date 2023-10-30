import axios from "axios";
import { parseUnits } from "ethers/lib/utils.js";
import { TokenRoute } from "../../../types/token";
import { oneInchConfig } from "../../utils/constants";

interface GetSwapParams extends TokenRoute {
  amountFrom: string;
}

export const getSwap = async ({
  tokenTo,
  tokenFrom,
  amountFrom,
}: GetSwapParams) => {
  const { data } = await axios.get(
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
