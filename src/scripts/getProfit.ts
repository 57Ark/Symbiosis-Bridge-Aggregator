import { formatEther, formatUnits, parseUnits } from "ethers/lib/utils";
import { CoinPrice, GasPrice } from "../../types/network";
import { TokenRoute } from "../../types/token";
import { BridgeGasLimit } from "../utils/constants";
import { getUsdcByChainId, retryRequest } from "../utils/utils";
import { getBridge } from "./base/getBridge";
import { getSwap } from "./base/getSwap";

interface GetProfitParams extends TokenRoute {
  amountFrom: string;
  gasPrices: GasPrice[];
  coinPrices: CoinPrice[];
}

export const getProfit = async ({
  tokenTo,
  tokenFrom,
  amountFrom,
  gasPrices,
  coinPrices,
}: GetProfitParams) => {
  const chainInGasPrice = +formatEther(
    parseUnits(
      gasPrices.find(
        (networkGasPrice) => networkGasPrice.chainId === tokenFrom.chainId
      )?.gasPrice ?? "0",
      "gwei"
    )
  );
  const chainOutGasPrice = +formatEther(
    parseUnits(
      gasPrices.find(
        (networkGasPrice) => networkGasPrice.chainId === tokenTo.chainId
      )?.gasPrice ?? "0",
      "gwei"
    )
  );
  const chainInCoinPrice = +(
    coinPrices.find((coin) => coin.chainId === tokenFrom.chainId)?.coinPrice ??
    "0"
  );
  const chainOutCoinPrice = +(
    coinPrices.find((coin) => coin.chainId === tokenTo.chainId)?.coinPrice ??
    "0"
  );

  const chainFromSwap = await retryRequest(
    () =>
      getSwap({
        amountFrom,
        tokenFrom: getUsdcByChainId(tokenFrom.chainId),
        tokenTo: tokenFrom,
      }),
    5
  );

  const bridge = await retryRequest(() =>
    getBridge({
      amountFrom: formatUnits(chainFromSwap.toAmount, tokenFrom.decimals),
      tokenFrom,
      tokenTo,
    })
  );

  const chainToSwap = await retryRequest(
    () =>
      getSwap({
        amountFrom: formatUnits(bridge.tokenAmountOut.amount, tokenTo.decimals),
        tokenFrom: tokenTo,
        tokenTo: getUsdcByChainId(tokenTo.chainId),
      }),
    5
  );

  const gasExpences =
    chainInCoinPrice * (+chainFromSwap.gas * chainInGasPrice) +
    chainOutCoinPrice * (+chainFromSwap.gas * chainOutGasPrice) +
    chainInCoinPrice *
      +formatEther(BridgeGasLimit[tokenFrom.chainId]) *
      chainInGasPrice;

  return (
    +formatUnits(
      chainToSwap.toAmount,
      getUsdcByChainId(tokenTo.chainId).decimals
    ) -
    +amountFrom -
    gasExpences
  );
};
