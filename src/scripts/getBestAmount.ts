import { findIndex, maxBy, sortBy } from "lodash";
import { CoinPrice, GasPrice } from "../../types/network";
import { TokenRoute } from "../../types/token";
import { getMultipleProfit } from "./getMultipleProfit";

interface GetBestAmountParams extends TokenRoute {
  gasPrices: GasPrice[];
  coinPrices: CoinPrice[];
}

export interface Profit {
  amount: number;
  profit?: number;
}

export const ExtendAmountList = ({ profitList }: { profitList: Profit[] }) => {
  const maxProfit = maxBy(profitList, ({ profit }) => profit);
  const index = findIndex(
    profitList,
    ({ amount }) => maxProfit?.amount === amount
  );

  if (profitList.length === 0 || index === -1) {
    return [
      { amount: 100 },
      { amount: 300 },
      { amount: 500 },
      { amount: 700 },
      { amount: 900 },
    ];
  }

  let lowerAmount: number;
  let higherAmount: number;

  if (index === 0) {
    lowerAmount = profitList[index].amount / 2;
    higherAmount =
      (profitList[index].amount + profitList[index + 1].amount) / 2;
  } else if (index === profitList.length - 1) {
    lowerAmount = (profitList[index].amount + profitList[index - 1].amount) / 2;
    higherAmount = profitList[index].amount + profitList[0].amount;
  } else {
    lowerAmount = (profitList[index].amount + profitList[index - 1].amount) / 2;
    higherAmount =
      (profitList[index].amount + profitList[index + 1].amount) / 2;
  }

  if (profitList.find(({ amount }) => amount === higherAmount) === undefined) {
    profitList.push({
      amount: higherAmount,
    });
  }
  if (profitList.find(({ amount }) => amount === lowerAmount) === undefined) {
    profitList.push({
      amount: lowerAmount,
    });
  }

  return sortBy(profitList, ["amount", "profit"]);
};

export const getBestAmounts = async ({
  tokenTo,
  tokenFrom,
  gasPrices,
  coinPrices,
}: GetBestAmountParams) => {
  let profitList: Profit[] = [];

  for (let i = 0; i < 8; ++i) {
    const updatedProfitList = ExtendAmountList({ profitList });

    const newProfitList = updatedProfitList
      .filter(({ profit }) => profit === undefined)
      .map(({ amount }) => amount);

    const currentProfits = await getMultipleProfit({
      amountList: newProfitList,
      gasPrices,
      coinPrices,
      tokenTo,
      tokenFrom,
    });

    currentProfits.forEach((profit) => profitList.push(profit));
    profitList = sortBy(profitList, ["amount", "profit"]).filter(
      ({ profit }) => profit !== undefined
    );

    const maxCurrentProfit = maxBy(profitList, ({ profit }) => profit);

    if (maxCurrentProfit && (maxCurrentProfit?.profit ?? 0) <= 0) {
      break;
    }
  }

  return profitList;
};
