import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { i18n } from "./i18n.config";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach(
    (value: any, key: any) => (negotiatorHeaders[key] = value)
  );

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export  function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
/*   const session = await getServerSession(authOptions);

  if (session?.web3.user?.TBA && !isAddress(session?.web3?.user?.TBA)) {
    return NextResponse.redirect("/onboard/mint");
  }
   */
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale: any) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|public|icons|parts).*)"],
};