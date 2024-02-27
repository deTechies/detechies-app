import { ThemeProvider } from "@/components/theme-provider";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { auth } from "@/lib/helpers/authOptions";
import type { Metadata } from "next";



import DictionaryProvider from "@/lib/dictionaryProvider";
import { signOut } from "next-auth/react";
import localFont from 'next/font/local';
import { redirect } from "next/navigation";
import App from "../app";
import "../globals.css";
import Footer from "./footer";
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
  title: "Connect Fast | Developers Profiles",
  description:
    "We help developers distinquish themselves and flourish the future with the latest tech",
};

export default async function RootLayout({
  params,
  children,
}: {
  params: { lang: Locale };
  children: React.ReactNode;
}) {
  const dictionary = (await getDictionary(params.lang)) as any;
  
  const session = await auth();
  
  if(!session){
    redirect("/onboard");
  }
  if(!session?.web3?.user?.verified) {
    signOut();
    redirect("/onboard");
  }

  return (
    <html lang={params.lang} suppressHydrationWarning>
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
            <DictionaryProvider dictionary={dictionary}>
              <main className="mx-auto max-w-[1600px] min-h-[70vh] mt-10 mb-20 px-4">{children}</main>
            </DictionaryProvider>
          </App>
          <Footer lang={dictionary} />
        </ThemeProvider>
      </body>
    </html>
  );
}
