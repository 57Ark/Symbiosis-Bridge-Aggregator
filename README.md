# Symbiosis Bridge Aggregator

Welcome to the Symbiosis Bridge Aggregator, your gateway to bridging assets between different chains. This guide will help you get the best chain pair and the amount to bridge your tokens via Symbiosis Finance.

## Prerequisites

Before using this bridge, make sure to create an `.env` file with the required configuration. You can find an example in `.env.example` to get you started.

## Usage


### Bridge

To launch the bridge, run one of the following commands:


```
pnpm ts-node-esm src/getBestPair.ts [token]
```

Replace `[token]` with the token you want to bridge. For example:

```
pnpm ts-node-esm src/getBestPair.ts XDAO
```

### Prices

To check the token prices and info about chains, run one of the following commands:


```
pnpm ts-node-esm src/getPrices.ts [token]
```

Replace `[token]` with the token you want to bridge. For example:

```
pnpm ts-node-esm src/getPrices.ts XDAO
```

## Available Tokens

Currently, you can bridge the following token:

- **XDAO**

## Coming Soon

Stay tuned for support for more tokens, including:

- **SIS**

Thank you for using Symbiosis Bridge Aggregator! If you have any questions or need assistance, feel free to reach out to us.
