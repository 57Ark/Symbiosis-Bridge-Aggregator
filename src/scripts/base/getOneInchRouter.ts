import axios from "axios";
import { OpenoceanRouters, oneInchConfig } from "../../utils/constants";
import { getNetworkByChainId } from "../../utils/utils";

export const getOneInchRouter = async ({ chainId }: { chainId: number }) => {
  const network = getNetworkByChainId(chainId);

  if (network.supportedDexes.includes("1inch")) {
    const { data } = await axios.get<{ address: string }>(
      `https://api.1inch.dev/swap/v5.2/${chainId}/approve/spender`,

      oneInchConfig
    );

    return data;
  }

  return { address: OpenoceanRouters[chainId] };
};
