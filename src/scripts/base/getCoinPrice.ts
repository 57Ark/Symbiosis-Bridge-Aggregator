import axios from "axios";
import { EtherscanResponse } from "../../../types/etherscan";
import { CoinPrice } from "../../../types/network";
import { getNetworkByChainId } from "../../utils/utils";

export const getCoinPrice = async ({ chainId }: { chainId: number }) => {
  const network = getNetworkByChainId(chainId);

  const { data } = await axios.get<
    EtherscanResponse<{
      ethusd?: string;
      maticusd?: string;
    }>
  >(
    `${
      network.explorerApi
    }?module=stats&action=${network.coin.toLowerCase()}price${
      network.apiKey ? `&apikey=${network.apiKey}` : ""
    }`
  );

  return {
    chainId,
    coinPrice: data.result?.ethusd ?? data.result?.maticusd ?? "",
  } as CoinPrice;
};
