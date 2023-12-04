import { ThemeProvider } from "@/components/theme-provider";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import type { Metadata } from "next";
import localFont from 'next/font/local';
import App from "../app";
import "../globals.css";
import Navbar from "./nav-bar";
 
// Font files can be colocated inside of `app`
const pretendard = localFont({
  src: '../pretendard.woff2',
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
  
  const dictionary = await getDictionary(params.lang) as any;
  return (
    <html lang="en">
      <body
        className={`${pretendard.className} bg-[#F2F3F5] text-primary min-h-[100vh]`}
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
