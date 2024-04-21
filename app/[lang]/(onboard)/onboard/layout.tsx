import { ThemeProvider } from "@/components/theme-provider";
import { Locale } from "@/i18n.config";
import type { Metadata } from "next";

import "../../globals.css";

import { Suspense } from "react";
import Loading from "../../(app)/loading";
import App from "../../app";

export const metadata: Metadata = {
  title: "deTechies | Developers Profiles",
  description:
    "We help developers distinquish themselves and flourish the future with the latest tech",
  keywords: "developers, freelancers, profiles, tech, software, web, mobile, blockchain, projects, achievements, edutech",
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
        className={`bg-light  text-gray-900 `}
      >

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <Suspense fallback={<Loading />}>
            <App>
              <main className="mx-auto max-w-lg flex items-center min-h-[100vh] px-4">
                {children}
              </main>
            </App>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
