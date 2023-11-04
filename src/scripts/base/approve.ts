import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { BigNumber, Wallet, constants } from "ethers";
import { IERC20__factory } from "../../../types/ethers-contracts/IERC20__factory";
import { Token } from "../../../types/token";
import { PRIVATE_KEY, WALLET_ADDRESS } from "../../utils/constants";
import { getNetworkByChainId } from "../../utils/utils";

interface approveParams {
  spender: string;
  amount: BigNumber;
  gasPrice: BigNumber;
  token: Token;
  nonce: number;
}

export const approve = async ({
  spender,
  amount,
  token,
  gasPrice,
  nonce,
}: approveParams) => {
  const network = getNetworkByChainId(token.chainId);
  const provider = new StaticJsonRpcProvider(network.rpc);
  const signer = new Wallet(PRIVATE_KEY, provider);

  const tokenContract = IERC20__factory.connect(token.address, signer);
  const allowance = await tokenContract.allowance(WALLET_ADDRESS, spender);

  if (amount.gt(allowance)) {
    const tx = await tokenContract.approve(spender, constants.MaxUint256, {
      gasPrice,
      nonce,
    });
    console.log("\nStarted Approve:");
    console.log(`https://${network.explorerAddress}/tx/${tx.hash}`);

    await tx.wait();

    console.log("Tx Success");
  }
};
