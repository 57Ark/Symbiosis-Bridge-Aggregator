import axios from "axios";
import { formatUnits } from "ethers/lib/utils";
import { EtherscanResponse } from "../../../types/etherscan";
import { GasPrice } from "../../../types/network";
import { getNetworkByChainId } from "../../utils/utils";

export const getGasPrice = async ({ chainId }: { chainId: number }) => {
  const network = getNetworkByChainId(chainId);

  const { data } = await axios.get<EtherscanResponse<string>>(
    `https://api.${network.explorerAddress}/api?module=proxy&action=eth_gasPrice&apikey=${network.apiKey}`
  );

  return { chainId, gasPrice: formatUnits(data.result, "gwei") } as GasPrice;
};
