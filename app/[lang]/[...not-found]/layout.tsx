import { ThemeProvider } from "@/components/theme-provider";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import DictionaryProvider from "@/lib/dictionaryProvider";
import { Metadata } from "next";
import App from "../app";
import "../globals.css";
import NavBar404 from "./nav-bar-404";

export const metadata: Metadata = {
  title: "deTechies - Build you career profile and grow with valuable insights",
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
    <html lang={params.lang} suppressHydrationWarning>
      <body
        className={`font-sans bg-background-layer-2 text-text-primary min-h-[100vh] `}
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
