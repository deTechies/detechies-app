import { ThemeProvider } from "@/components/theme-provider";
import { Locale } from "@/i18n.config";
import type { Metadata } from "next";
import localFont from 'next/font/local';

import "../globals.css";

import { Suspense } from "react";
import App from "../app";

 
// Font files can be colocated inside of `app`
const pretendard = localFont({
  src: [
    {
      path: '../pretendard-regular.woff2',
      weight: '400', // Regular
      style: 'normal',
    },
    {
      path: '../pretendard-semibold.woff2',
      weight: '600', // SemiBold
      style: 'normal',
    },
    {
      path: '../pretendard-bold.woff2',
      weight: '700', // Bold
      style: 'normal',
    }
  ],
  display: 'swap',
})


export const metadata: Metadata = {
  title: "Careerzen - Build you career profile and grow with valuable insights",
  description:
    "We help you build your career profile and grow your personal career and network",
};

export default async function RootLayout({
  params,
  children,
}: {
  params: { lang: Locale };
  children: React.ReactNode;
}) {
  

  
  return (
    <html lang="kr" suppressHydrationWarning>
      <body
        className={`${pretendard.className} bg-background-layer-1 text-text-primary min-h-[100vh] `}

      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <Suspense fallback="loading app">
          <App>
            <main className="mx-auto max-w-lg flex items-center min-h-[100vh]">
            {children}
            </main>
          </App>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

