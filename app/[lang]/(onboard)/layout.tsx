import { ThemeProvider } from "@/components/theme-provider";
import { Locale } from "@/i18n.config";
import type { Metadata } from "next";
import localFont from 'next/font/local';

import App from "@/app/[lang]/app";
import "..//globals.css";

 
// Font files can be colocated inside of `app`
const pretendard = localFont({
  src: '../../[lang]/pretendard.woff2',
  display: 'swap',
})


export const metadata: Metadata = {
  title: "Careerzen - Build you career profile and grow your personal career and network",
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
    <html lang="en">
      <body
        className={`${pretendard.className} text-primary bg-background-layer-1`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <App>
            {children}
          </App>
        </ThemeProvider>
      </body>
    </html>
  );
}
