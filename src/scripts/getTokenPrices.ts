import { Token } from "../../types/token";
import { NETWORKS } from "../utils/constants";
import { getCoinPrice } from "./base/getCoinPrice";
import { getGasPrice } from "./base/getGasPrice";
import { getTokenPrice } from "./base/getTokenPrice";

export const getTokenPrices = async ({ tokenList }: { tokenList: Token[] }) => {
  const coinPrices = await Promise.all(
    NETWORKS.map((network) =>
      getCoinPrice({
        chainId: network.chainId,
      })
    )
  );

  const gasPrices = await Promise.all(
    NETWORKS.map((network) => getGasPrice({ chainId: network.chainId }))
  );

  const tokenPrices = await Promise.all(
    tokenList.map((token) => {
      const gasPrice =
        gasPrices
          .find((networkGasPrice) => networkGasPrice.chainId === token.chainId)
          ?.gasPrice.toString() ?? "0";
      return getTokenPrice({ ...token, gasPrice });
    })
  );

  return { coinPrices, gasPrices, tokenPrices };
};
