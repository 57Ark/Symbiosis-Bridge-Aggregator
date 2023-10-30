import axios from "axios";
import { oneInchConfig } from "../../utils/constants";

export const getOneInchRouter = async ({ chainId }: { chainId: number }) => {
  const { data } = await axios.get<{ address: string }>(
    `https://api.1inch.dev/swap/v5.2/${chainId}/approve/spender`,

    oneInchConfig
  );

  return data;
};
