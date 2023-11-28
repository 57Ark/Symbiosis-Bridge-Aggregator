import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { formatUnits } from "ethers/lib/utils";
import { GasPrice } from "../../../types/network";
import { getNetworkByChainId } from "../../utils/utils";

export const getGasPrice = async ({ chainId }: { chainId: number }) => {
  const network = getNetworkByChainId(chainId);
  const provider = new StaticJsonRpcProvider(network.rpc);

  const gasPrice = await provider.getGasPrice();

  return { chainId, gasPrice: formatUnits(gasPrice, "gwei") } as GasPrice;
};
