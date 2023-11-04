import { getTokenPrices } from "./scripts/getTokenPrices";
import { TOKEN_LIST } from "./utils/constants";
import { getNetworkByChainId } from "./utils/utils";

const getPrices = async () => {
  const [, , tokenName] = process.argv;

  const tokenList = TOKEN_LIST[tokenName.toLowerCase()];

  if (tokenList === undefined) {
    return console.log("\x1b[31mInvalid token\x1b[0m");
  }

  const { coinPrices, gasPrices, tokenPrices } = await getTokenPrices({
    tokenList,
  });

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
};

require("dotenv").config();
getPrices();
