import axios from "axios";
import dayjs from "dayjs";
import { parseUnits } from "ethers/lib/utils";
import { SymbiosisExactInResponse } from "../../../types/symbiosis";
import { TokenRoute } from "../../../types/token";
import { WALLET_ADDRESS } from "../../utils/constants";

interface GetBridgeParams extends TokenRoute {
  amountFrom: string;
}

export const getBridge = async ({
  tokenTo,
  tokenFrom,
  amountFrom,
}: GetBridgeParams) => {
  const { data } = await axios.post<SymbiosisExactInResponse>(
    "https://api.teleport.symbiosis.finance/crosschain/v1/swapping/exact_in",
    {
      tokenAmountIn: {
        ...tokenFrom,
        amount: parseUnits(amountFrom, tokenFrom.decimals).toString(),
      },
      tokenOut: { ...tokenTo },
      to: WALLET_ADDRESS,
      from: WALLET_ADDRESS,
      revertableAddress: WALLET_ADDRESS,
      slippage: 300,
      deadline: dayjs().unix() + 1200,
    }
  );

  return data;
};
