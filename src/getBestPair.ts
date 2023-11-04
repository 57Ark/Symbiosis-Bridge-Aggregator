import yesno from "yesno";
import { executeRoute } from "./scripts/executeRoute";
import { getBestAmountForAllPairs } from "./scripts/getBestAmountForAllPairs";
import { TOKEN_LIST } from "./utils/constants";
import { getNetworkByChainId } from "./utils/utils";

const main = async () => {
  const [, , tokenName] = process.argv;

  const tokenList = TOKEN_LIST[tokenName.toLowerCase()];

  if (tokenList === undefined) {
    return console.log("\x1b[31mInvalid token\x1b[0m");
  }

  const bestPair = await getBestAmountForAllPairs({ tokenList });

  console.log("\n\n\n");

  if (bestPair === undefined || (bestPair?.profit ?? 0) <= 0) {
    console.log("\x1b[31mThere is no profitable pair\x1b[0m");
    return;
  }

  const networkFrom = getNetworkByChainId(bestPair.tokenFrom.chainId);
  const networkTo = getNetworkByChainId(bestPair.tokenTo.chainId);
  console.log(`Best ${bestPair.tokenFrom.symbol} bridge:`);
  console.log(
    `From ${networkFrom.name} to ${networkTo.name} for ${bestPair.amount} USDC`
  );
  console.log(`Profit: \x1b[32m${bestPair.profit}\x1b[0m\n\n`);

  if ((bestPair?.profit ?? 0) >= 0) {
    const ok = await yesno({
      question: `Do you want to bridge ${bestPair.tokenFrom.symbol} from ${networkFrom.name} to ${networkTo.name} for ${bestPair.amount} USDC? (y/n)\n`,
    });

    if (ok) {
      await executeRoute({
        tokenFrom: bestPair.tokenFrom,
        tokenTo: bestPair.tokenTo,
        amountFrom: bestPair.amount.toString(),
      });
    } else {
      return;
    }
  }
  return;
};

require("dotenv").config();
main();
