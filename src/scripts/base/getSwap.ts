import axios from "axios";
import { parseUnits } from "ethers/lib/utils.js";
import { OneInchSwapResponse } from "../../../types/oneInch";
import { openOceanSwapResponse } from "../../../types/openOcean";
import { TokenRoute } from "../../../types/token";
import { WALLET_ADDRESS, oneInchConfig } from "../../utils/constants";
import { getNetworkByChainId } from "../../utils/utils";

interface getSwapParams extends TokenRoute {
  amountFrom: string;
  gasPrice: string;
}

export const getSwap = async ({
  tokenTo,
  tokenFrom,
  amountFrom,
  gasPrice,
}: getSwapParams) => {
  const network = getNetworkByChainId(tokenFrom.chainId);

  if (network.supportedDexes.includes("1inch")) {
    const { data } = await axios.get<OneInchSwapResponse>(
      `https://api.1inch.dev/swap/v5.2/${
        tokenFrom.chainId
      }/swap/?from=${WALLET_ADDRESS}&src=${tokenFrom.address}&dst=${
        tokenTo.address
      }&amount=${parseUnits(amountFrom, tokenFrom.decimals)}&slippage=1`,

      oneInchConfig
    );

    return data;
  }

  const { data } = await axios.get<openOceanSwapResponse>(
    `https://open-api.openocean.finance/v3/${tokenFrom.chainId}/swap_quote?account=${WALLET_ADDRESS}&inTokenAddress=${tokenFrom.address}&outTokenAddress=${tokenTo.address}&amount=${amountFrom}&gasPrice=${gasPrice}&slippage=1`
  );

  return {
    toAmount: data.data.outAmount,
    tx: {
      to: data.data.to,
      data: data.data.data,
      value: data.data.value,
      gasPrice: data.data.gasPrice,
      gas: +data.data.estimatedGas,
    },
  };
};
