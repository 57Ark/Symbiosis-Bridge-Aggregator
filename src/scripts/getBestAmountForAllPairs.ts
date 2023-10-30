import { flatten, maxBy } from "lodash";
import { Token, TokenRoute } from "../../types/token";
import { NETWORKS } from "../utils/constants";
import { getNetworkByChainId } from "../utils/utils";
import { getCoinPrice } from "./base/getCoinPrice";
import { getGasPrice } from "./base/getGasPrice";
import { getTokenPrice } from "./base/getTokenPrice";
import { getBestAmounts } from "./getBestAmount";

export const getBestAmountForAllPairs = async ({
  tokenList,
}: { tokenList: Token[] }) => {
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
    tokenList.map((token) => getTokenPrice({ ...token }))
  );

  const baseInfo = tokenPrices.map(({ chainId, price }) => {
    const gasPrice = gasPrices.find(
      (networkGasPrice) => networkGasPrice.chainId === chainId
    )?.gasPrice;
    const coinPrice = coinPrices.find(
      (token) => token.chainId === chainId
    )?.coinPrice;

    return {
      Chain: getNetworkByChainId(chainId).name,
      "Token price": `${price} $`,
      "Coin price": `${coinPrice} $`,
      "Gas price": `${gasPrice} gwei`,
    };
  });

  console.table(baseInfo);

  const tokenPairs: TokenRoute[] = [];

  for (let i = 0; i < tokenPrices.length; ++i) {
    for (let j = i + 1; j < tokenPrices.length; ++j) {
      if (tokenPrices[i].price > tokenPrices[j].price) {
        tokenPairs.push({
          tokenTo: tokenPrices[i],
          tokenFrom: tokenPrices[j],
        });
      } else {
        tokenPairs.push({
          tokenTo: tokenPrices[j],
          tokenFrom: tokenPrices[i],
        });
      }
    }
  }

  const crosschainSwaps = await Promise.all(
    tokenPairs.map((pair) =>
      getBestAmounts({
        gasPrices,
        coinPrices,
        ...pair,
      })
    )
  );

  console.clear();
  console.table(baseInfo);

  crosschainSwaps.forEach((profits, index) => {
    const pair = tokenPairs[index];
    const networkFrom = getNetworkByChainId(pair.tokenFrom.chainId);
    const networkTo = getNetworkByChainId(pair.tokenTo.chainId);

    const filteredProfits = profits.filter(({ profit }) => (profit ?? 0) > 0);
    const bestProfit = maxBy(profits, ({ profit }) => profit);
    console.log(
      `\n\nSwap ${pair.tokenFrom.symbol} from ${networkFrom.name} to ${networkTo.name}`
    );

    if (filteredProfits.length > 0) {
      console.log(`Best amount: \x1b[32m${bestProfit?.amount}\x1b[0m`);
      console.log(`Profit: \x1b[32m${bestProfit?.profit}\x1b[0m`);
    } else {
      console.log("\x1b[31mThere is no profitable amount for this pair\x1b[0m");
    }
    console.table(profits);
  });

  const flattenSwaps = flatten(
    crosschainSwaps.map((profits, index) => {
      const pair = tokenPairs[index];

      return profits.map((profit) => ({
        tokenFrom: pair.tokenFrom,
        tokenTo: pair.tokenTo,
        ...profit,
      }));
    })
  );

  return maxBy(flattenSwaps, ({ profit }) => profit);
};
