import { NETWORKS, USDC_TOKEN } from "./constants";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const retryRequest = async (
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  executablePromise: () => Promise<any>,
  sleepSeconds?: number
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
): Promise<any> => {
  try {
    return await executablePromise();
  } catch (e) {
    console.log(`Request Failed with reason: ${e}`);
    if (sleepSeconds) {
      await sleep(sleepSeconds * 1000);
    }

    return await retryRequest(executablePromise);
  }
};

export const getNetworkByChainId = (chainId: number | string) => {
  const network = NETWORKS.find((network) => network.chainId === +chainId);

  if (!network) {
    throw new Error("Network with this chain id doesn't exists");
  }

  return network;
};

export const getUsdcByChainId = (chainId: number | string) => {
  const token = USDC_TOKEN.find((network) => network.chainId === +chainId);

  if (!token) {
    throw new Error("USDC on this chain doesn't exists");
  }

  return token;
};
