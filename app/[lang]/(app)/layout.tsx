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
});


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
  const dictionary = (await getDictionary(params.lang)) as any;
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${pretendard.className} font-sans bg-background-layer-2 text-text-primary min-h-[100vh] `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <App>
            <Navbar lang={dictionary.nav} />
            <main className="mx-auto max-w-[1920px]">{children}</main>
          </App>
        </ThemeProvider>
      </body>
    </html>
  );
}
