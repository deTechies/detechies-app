import { ThemeProvider } from "@/components/theme-provider";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import type { Metadata } from "next";



import DictionaryProvider from "@/lib/dictionaryProvider";
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import App from "../app";
import "../globals.css";
import Footer from "./_components/footer";
import Navbar from "./_components/nav-bar";
const inter = Inter({ subsets: ['latin'] })

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
  const dictionary = (await getDictionary(params.lang)) as any;


  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body
        className={`${inter.className} font-sans bg-background-layer-2 text-text-primary min-h-[100vh] `}
      >
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <App>
            <Navbar lang={dictionary.nav} />
            <DictionaryProvider dictionary={dictionary}>
              <main className="mx-auto max-w-[1600px] min-h-[70vh] ">{children}</main>
            </DictionaryProvider>
          </App>
          <Footer lang={dictionary} />
        </ThemeProvider>
      </body>
    </html>
  );
}
