import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.endsWith(".html") && pathname !== "/google9b97d0a79216252b.html") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/index.html" ? "/" : pathname.replace(/\.html$/i, "");
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*.html"]
};
