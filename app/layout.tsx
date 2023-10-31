import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import App from "./app";
import "./globals.css";
import Nav from "./nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Careerzen - Validate your career",
  description:
    "We help you build your career profile and grow your personal career and network",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <Nav />
            {children}
          </App>
        </ThemeProvider>
      </body>
    </html>
  );
}
