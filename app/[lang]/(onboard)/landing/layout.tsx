import { ThemeProvider } from "@/components/theme-provider";
import { Locale } from "@/i18n.config";
import type { Metadata } from "next";

import "../../globals.css";

import { Inter } from "next/font/google";
import { Suspense } from "react";
import Loading from "../../(app)/loading";
import App from "../../app";
import LandingHeader from "./_components/landing-header";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "deTechies - Build you career profile and grow with valuable insights",
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
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${inter.className}  bg-background-layer-1 text-text-primary `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <Suspense fallback={<Loading />}>
            <App>
              <main className="m-10">
                <LandingHeader />
                {children}
              </main>
            </App>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
