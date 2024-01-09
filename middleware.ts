import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { i18n } from "./i18n.config";
export { default } from "next-auth/middleware";


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

  const locale = matchLocale(['kr'], locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  

  
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
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|public|icons|parts).*)",
  ],
};
