import { ThemeProvider } from "@/components/theme-provider";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import App from "./app";
import "./globals.css";
import Navbar from "./nav-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Careerzen - Validate your career",
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
  
  const dictionary = await getDictionary(params.lang) as any;
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-b from-state-info-secondary to-accent-secondary text-primary min-h-[100vh]`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <App>
            <Navbar lang={dictionary.nav} />
            {children}
          </App>
        </ThemeProvider>
      </body>
    </html>
  );
}

