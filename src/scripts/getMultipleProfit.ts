import { CoinPrice, GasPrice } from "../../types/network";
import { TokenRoute, TokenWithPrice } from "../../types/token";
import { getProfit } from "./getProfit";

interface GetMultipleProfitParams extends TokenRoute {
  amountList: string[] | number[];
  gasPrices: GasPrice[];
  coinPrices: CoinPrice[];
}

export const getMultipleProfit = async ({
  tokenTo,
  tokenFrom,
  amountList,
  gasPrices,
  coinPrices,
}: GetMultipleProfitParams) => {
  const profits = await Promise.all(
    amountList.map((amount) =>
      getProfit({
        tokenTo,
        tokenFrom,
        amountFrom: `${amount}`,
        gasPrices,
        coinPrices,
      })
    )
  );

  return profits.map((profit, index) => ({
    amount: +amountList[index],
    profit,
  }));
};
