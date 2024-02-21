"use client";

import { Toaster } from "@/components/ui/toaster";
import { polygonMumbai } from "@/helpers/mumbai";
import SessionProvider from "@/lib/SessionProvider";
import { Analytics } from "@vercel/analytics/react";
import { Web3Auth } from "@web3auth/modal";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { WagmiConfig, WindowProvider, configureChains, createConfig } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

import type { WepinConnectorOptions } from "@wepin/wagmi-connector";
import { WepinConnector } from "@wepin/wagmi-connector";


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

declare global {
  interface Window {
    ethereum?: WindowProvider
  }
}

export const web3AuthInstance =
  typeof window !== "undefined"
    ? new Web3Auth({
        clientId:
          "BDlUlpSomDUSEzG9ZfwlbTUuhSnNPHqQuciI7suaSc4xMwQV_B3xHwXEFmDml2Rh96GnXuNFw4pfQ5CPX6B0A7o",
        web3AuthNetwork: "testnet",
        chainConfig: {
          chainNamespace: "eip155",
          chainId: "0x13881",
          rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
          displayName: "Polygon Mumbai Testnet",
          blockExplorer: "https://mumbai.polygonscan.com/",
          ticker: "MATIC",
          tickerName: "Matic",
        },
      })
    : null;

// Wepin



const testAppKey = "ak_test_YwTTMVZ0M6PXZQxEqdpeJ9kMGVuZUPLVZJxxfqEFDj1";
export const testAppId = "ff3163da820c8058bd1ed9f7a67c2133";
// const testAppKey = 'ak_test_ghq1D5s1sfG234sbnhdsw24mnovk313' // 테스트용 앱 키 
// const testAppId = 'app_id_eg12sf3491azgs520' // 테스트용 앱 ID

const wepin_key = process.env.NEXT_PUBLIC_WEPIN_APP;
const wepin_app = process.env.NEXT_PUBLIC_WEPIN_APP_ID;

const wepin_prod_key = process.env.WEPIN_PROD_APP;
const wepin_prod_app = process.env.WEPIN_PROD_APP_ID;

const connectorOptions: WepinConnectorOptions = {
  appId: wepin_app || wepin_prod_app || testAppId,
  appKey: wepin_key || wepin_prod_key|| testAppKey,
  defaultChainId: 80001,
  attributes: {
    type: 'hide',
  }
};

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
    new WepinConnector({
      chains,
      options: connectorOptions,
    }),
    //Web3AuthConnectorInstance(chains) as any,
  ],
  publicClient,
  webSocketPublicClient,
});



export default function App({ children }: { children: any }) {

  return (
    <WagmiConfig config={config}>
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
      <Analytics />
    </WagmiConfig>
  );
}
