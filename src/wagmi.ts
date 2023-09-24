import { configureChains, createConfig } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { publicProvider } from "wagmi/providers/public";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import {
  foundry,
  goerli,
  polygonMumbai,
  celoAlfajores,
  lineaTestnet,
  baseGoerli,
  arbitrumGoerli,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";

const walletConnectProjectId = "fb272cafac62fc71192ecc627cf61ee1";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    goerli,
    polygonMumbai,
    celoAlfajores,
    lineaTestnet,
    baseGoerli,
    arbitrumGoerli,
  ],
  [
    alchemyProvider({ apiKey: "3TYMB_b0X1p4YBVMdNppiSpwIsAlPiJJ" }),
    publicProvider(),
  ]
);

export const config = defaultWagmiConfig({
  chains,
  projectId: walletConnectProjectId,
  appName: "SafeCreate2",
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId: walletConnectProjectId,
  chains,
});
