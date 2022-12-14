import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
  ],
};

/**
 * @param req
 */
export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
  const hostname = req.headers.get("host");

  // If localhost, assign the host value manually
  // If prod, get the custom domain/subdomain value by removing the root URL
  // (in the case of "test.vercel.app", "vercel.app" is the root URL)
  const currentHost = hostname?.replace(new RegExp(process.env.HERO_INSURANCE_DOMAIN, "i"), "")

  console.log({currentHost})

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents. This can also be done
  // via rewrites to a custom 404 page
  if (url.pathname.startsWith(`/_sites`)) {
    return new Response(null, { status: 404 });
  }


  // if (
  //   !pathname.includes(".") && // exclude all files in the public folder
  //   !pathname.startsWith("/api") // exclude all API routes
  // ) {
  //   // rewrite to the current hostname under the pages/sites folder
  //   // the main logic component will happen in pages/sites/[site]/index.tsx
  // }
   // rewrite everything else to `/_sites/[site] dynamic route
   url.pathname = `/_sites/${currentHost}${url.pathname}`;
  return NextResponse.rewrite(url);
}
