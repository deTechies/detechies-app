import localFont from "next/font/local";
import { Locale } from "@/i18n.config";
import "../globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import App from "../app";
import DictionaryProvider from "@/lib/dictionaryProvider";
import { getDictionary } from "@/get-dictionary";
import NavBar404 from "./nav-bar-404";

export const metadata: Metadata = {
  title: "Careerzen - Build you career profile and grow with valuable insights",
  description:
    "We help you build your career profile and grow your personal career and network",
};

const pretendard = localFont({
  src: [
    {
      path: "../pretendard-regular.woff2",
      weight: "400", // Regular
      style: "normal",
    },
    {
      path: "../pretendard-semibold.woff2",
      weight: "600", // SemiBold
      style: "normal",
    },
    {
      path: "../pretendard-bold.woff2",
      weight: "700", // Bold
      style: "normal",
    },
  ],
  display: "swap",
});

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
        className={`${pretendard.className} font-sans bg-background-layer-2 text-text-primary min-h-[100vh] `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <App>
            <NavBar404 />

            <DictionaryProvider dictionary={dictionary}>
              <main className="mx-auto max-w-[1600px] min-h-[70vh] mt-10 mb-20 px-4">
                {children}
              </main>
            </DictionaryProvider>
          </App>
        </ThemeProvider>
      </body>
    </html>
  );
}
