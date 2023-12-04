# Symbiosis Bridge Aggregator

Welcome to the Symbiosis Bridge Aggregator, your gateway to bridging assets between different chains. This guide will help you get the best chain pair and the amount to bridge your tokens via Symbiosis Finance.

## Prerequisites

Before using this bridge, make sure to create an `.env` file with the required configuration. You can find an example in `.env.example` to get you started.

## Usage


### Bridge

To launch the bridge, run one of the following commands:


```
pnpm ts-node src/getBestPair.ts [token]
```

Replace `[token]` with the token you want to bridge. For example:

```
pnpm ts-node src/getBestPair.ts SIS
```

All pair comparisons are making in parallel. If one of the third-parties blocks the requests due to "Too many requests (429)", you can execute them sequentially by adding "false" to the end of the command. For example:

```
pnpm ts-node src/getBestPair.ts SIS false
```

### Prices

To check the token prices and info about chains, run one of the following commands:


```
pnpm ts-node src/getPrices.ts [token]
```

Replace `[token]` with the token you want to bridge. For example:

```
pnpm ts-node src/getPrices.ts SIS
```

## Available Tokens

Currently, you can bridge the following token:

- **SIS**
- **XDAO**


Thank you for using Symbiosis Bridge Aggregator! If you have any questions or need assistance, feel free to reach out to us.
