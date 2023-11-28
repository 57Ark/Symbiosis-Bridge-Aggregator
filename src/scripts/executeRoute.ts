import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { BigNumber, Wallet, constants } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { IERC20__factory } from "../../types/ethers-contracts/IERC20__factory";
import { TokenRoute } from "../../types/token";
import { PRIVATE_KEY, WALLET_ADDRESS } from "../utils/constants";
import {
  getNetworkByChainId,
  getUsdcByChainId,
  retryRequest,
  sleep,
} from "../utils/utils";
import { approve } from "./base/approve";
import { getBridge } from "./base/getBridge";
import { getGasPrice } from "./base/getGasPrice";
import { getOneInchRouter } from "./base/getOneInchRouter";
import { getSwap } from "./base/getSwap";
import { getTxCount } from "./base/getTxCount";

interface getRouteParams extends TokenRoute {
  amountFrom: string;
}

export const executeRoute = async ({
  tokenFrom,
  tokenTo,
  amountFrom,
}: getRouteParams) => {
  const networkFrom = getNetworkByChainId(tokenFrom.chainId);
  const networkTo = getNetworkByChainId(tokenTo.chainId);

  const providerFrom = new StaticJsonRpcProvider(networkFrom.rpc);
  const providerTo = new StaticJsonRpcProvider(networkTo.rpc);

  const signerFrom = new Wallet(PRIVATE_KEY, providerFrom);
  const signerTo = new Wallet(PRIVATE_KEY, providerTo);

  const [txCountFrom, txCountTo] = await Promise.all([
    getTxCount({ chainId: tokenFrom.chainId }),
    getTxCount({ chainId: tokenTo.chainId }),
  ]);

  const [gasPriceFrom, gasPriceTo] = await Promise.all([
    getGasPrice({ chainId: networkFrom.chainId }),
    getGasPrice({ chainId: networkTo.chainId }),
  ]);

  const initialBalance = await IERC20__factory.connect(
    tokenTo.address,
    providerTo
  ).balanceOf(WALLET_ADDRESS);

  const routerFrom = await getOneInchRouter({ chainId: tokenFrom.chainId });
  await approve({
    spender: routerFrom.address,
    amount: parseUnits(
      amountFrom,
      getUsdcByChainId(tokenFrom.chainId).decimals
    ),
    token: getUsdcByChainId(tokenFrom.chainId),
    gasPrice: parseUnits(gasPriceFrom.gasPrice, "gwei"),
    nonce: txCountFrom,
  });

  const chainFromSwap = await retryRequest(
    () =>
      getSwap({
        amountFrom,
        tokenFrom: getUsdcByChainId(tokenFrom.chainId),
        tokenTo: tokenFrom,
      }),
    5
  );

  const firstTx = await signerFrom.sendTransaction({
    to: chainFromSwap.tx.to,
    data: chainFromSwap.tx.data,
    value: constants.Zero,
    gasPrice: parseUnits(`${10 * +gasPriceFrom.gasPrice}`, "gwei"),
    nonce: txCountFrom + 1,
  });

  console.log("\nStarted Swap:");
  console.log(`${networkFrom.explorerAddress}/tx/${firstTx.hash}`);
  await firstTx.wait();

  console.log("Tx Success");

  const bridge = await retryRequest(() =>
    getBridge({
      amountFrom: formatUnits(chainFromSwap.toAmount, tokenFrom.decimals),
      tokenFrom,
      tokenTo,
    })
  );

  await approve({
    spender: bridge.tx.to,
    amount: BigNumber.from(chainFromSwap.toAmount),
    token: tokenFrom,
    gasPrice: parseUnits(gasPriceFrom.gasPrice, "gwei"),
    nonce: txCountFrom + 2,
  });

  const secondTx = await signerFrom.sendTransaction({
    to: bridge.tx.to,
    data: bridge.tx.data,
    value: constants.Zero,
    gasPrice: parseUnits(`${10 * +gasPriceFrom.gasPrice}`, "gwei"),
    nonce: 3,
  });

  console.log("\nStarted Bridge:");
  console.log(`${networkFrom.explorerAddress}/tx/${secondTx.hash}`);
  await secondTx.wait();

  console.log("Tx Success");

  let gotFunds = false;

  while (!gotFunds) {
    const newBalance = await IERC20__factory.connect(
      tokenTo.address,
      providerTo
    ).balanceOf(WALLET_ADDRESS);

    if (newBalance.gt(initialBalance)) {
      gotFunds = true;
    } else {
      await sleep(60000);
    }
  }

  const routerTo = await getOneInchRouter({ chainId: tokenTo.chainId });
  await approve({
    spender: routerTo.address,
    amount: BigNumber.from(bridge.tokenAmountOut.amount),
    token: tokenTo,
    gasPrice: parseUnits(gasPriceTo.gasPrice, "gwei"),
    nonce: txCountTo + 0,
  });

  const chainToSwap = await retryRequest(
    () =>
      getSwap({
        amountFrom: formatUnits(bridge.tokenAmountOut.amount, tokenTo.decimals),
        tokenFrom: tokenTo,
        tokenTo: getUsdcByChainId(tokenTo.chainId),
      }),
    5
  );

  const thirdTx = await signerTo.sendTransaction({
    to: chainToSwap.tx.to,
    data: chainToSwap.tx.data,
    value: constants.Zero,
    gasPrice: parseUnits(`${10 * +gasPriceTo.gasPrice}`, "gwei"),
    nonce: txCountTo + 1,
  });

  console.log("\nStarted Swap:");
  console.log(`${networkTo.explorerAddress}/tx/${thirdTx.hash}`);
  await thirdTx.wait();
};
