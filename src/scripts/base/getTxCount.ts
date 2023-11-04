import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { WALLET_ADDRESS } from "../../utils/constants";
import { getNetworkByChainId } from "../../utils/utils";

interface getTxCountParams {
  chainId: number;
}

export const getTxCount = async ({ chainId }: getTxCountParams) => {
  const network = getNetworkByChainId(chainId);
  const provider = new StaticJsonRpcProvider(network.rpc);

  const txCount = await provider.getTransactionCount(WALLET_ADDRESS);

  return txCount;
};
