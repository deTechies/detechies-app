import { ThemeProvider } from "@/components/theme-provider";
import { Locale } from "@/i18n.config";
import type { Metadata } from "next";

import "../../globals.css";

import { Suspense } from "react";
import Loading from "../../(app)/loading";
import App from "../../app";

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
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`bg-background-layer-1 text-text-primary `}
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
