"use client";

import { Toaster } from "@/components/ui/toaster";
import SessionProvider from "@/lib/SessionProvider";
import PushProvider from "@/lib/usePushProtocol";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { arbitrumSepolia } from "viem/chains";

import {
  WagmiConfig,
  WindowProvider,
  configureChains,
  createConfig,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [arbitrumSepolia],
  [publicProvider()]
);

declare global {
  interface Window {
    ethereum?: WindowProvider;
  }
}
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x66EEB", // hex of 421611
  rpcTarget: "https://rpc.ankr.com/arbitrum",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Arbitrum Testnet",
  ticker: "AETH",
  tickerName: "AETH"
};
const mainchainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xA4B1", // hex of 42161
  rpcTarget: "https://rpc.ankr.com/arbitrum",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Arbitrum Mainnet",

  ticker: "AETH",
  tickerName: "AETH",
};
export const web3AuthInstance =
  typeof window !== "undefined"
    ? new Web3Auth({
        clientId:
          "BJKpsKLTGGib-v-OPsIrirs0kUhbWsES2V0kakHS0fJI8MGTG2pZboFM0Fe6I7nCHlKphqZLXpZOMiWPEqTkPJA",
        web3AuthNetwork: "testnet",
        chainConfig: mainchainConfig
      })
    : null;

const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: "optional",
  },
  adapterSettings: {
    uxMode: "redirect", // "redirect" | "popup"
    whiteLabel: {
      logoLight: "https://web3auth.io/images/web3auth-logo.svg",
      logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
      defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
      mode: "auto", // whether to enable dark, light or auto mode. defaultValue: auto [ system theme]
    },
    mfaSettings: {
      deviceShareFactor: {
        enable: true,
        priority: 1,
        mandatory: true,
      },
      backUpShareFactor: {
        enable: true,
        priority: 2,
        mandatory: false,
      },
      socialBackupFactor: {
        enable: true,
        priority: 3,
        mandatory: false,
      },
      passwordFactor: {
        enable: true,
        priority: 4,
        mandatory: false,
      },
    },
  },
}) as any;
web3AuthInstance?.configureAdapter(openloginAdapter);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Browser",
        shimDisconnect: true,
      },
    }),
    new Web3AuthConnector({
      chains: chains as any,
      // @ts-ignore
      options: { web3AuthInstance, name: "Social Login" },
      name: "Social Login",
    }),

    //Web3AuthConnectorInstance(chains) as any,
  ],
  publicClient,
  webSocketPublicClient,
});

export default function App({ children }: { children: any }) {
  return (
    <WagmiConfig config={config}>
      <PushProvider>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </PushProvider>
    </WagmiConfig>
  );
}
