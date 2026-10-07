import { NextResponse, type NextRequest } from "next/server";

import { localeFromPathname, negotiateLocale } from "./app/i18n/locales";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (localeFromPathname(pathname) !== undefined) return;

  const locale = negotiateLocale(request.headers.get("accept-language"));
  const target = request.nextUrl.clone();
  target.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(target);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
