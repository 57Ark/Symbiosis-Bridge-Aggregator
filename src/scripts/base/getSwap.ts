import axios from "axios";
import { parseUnits } from "ethers/lib/utils.js";
import { OneInchSwapResponse } from "../../../types/oneInch";
import { TokenRoute } from "../../../types/token";
import { WALLET_ADDRESS, oneInchConfig } from "../../utils/constants";

interface getSwapParams extends TokenRoute {
  amountFrom: string;
}

export const getSwap = async ({
  tokenTo,
  tokenFrom,
  amountFrom,
}: getSwapParams) => {
  const { data } = await axios.get<OneInchSwapResponse>(
    `https://api.1inch.dev/swap/v5.2/${
      tokenFrom.chainId
    }/swap/?from=${WALLET_ADDRESS}&src=${tokenFrom.address}&dst=${
      tokenTo.address
    }&amount=${parseUnits(amountFrom, tokenFrom.decimals)}&slippage=1`,

    oneInchConfig
  );

  return data;
};
