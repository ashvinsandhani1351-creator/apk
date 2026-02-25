import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public (public files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
};

export default function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const hostname = req.headers.get('host') || '';

    // Define domains to exclude from subdomain routing
    const mainDomains = ['bitcryptpress.online', 'localhost:3000', 'localhost:3001', 'www.bitcryptpress.online'];

    // Extract subdomain
    let subdomain = '';
    if (hostname.includes('bitcryptpress.online')) {
        subdomain = hostname.replace(`.bitcryptpress.online`, '').replace('www.', '');
    } else if (hostname.includes('localhost')) {
        // For local testing: sub.localhost -> subdomain='sub'
        const parts = hostname.split('.');
        if (parts.length > 1) {
            subdomain = parts[0];
        }
    }

    // If we have a valid subdomain and it's not one of our main domains
    if (subdomain && !mainDomains.includes(hostname)) {
        // Only rewrite the root path to the app detail page
        // Other paths like /download can also be handled if needed
        if (url.pathname === '/') {
            console.log(`Rewriting subdomain ${subdomain} to /app/${subdomain}`);
            url.pathname = `/app/${subdomain}`;
            return NextResponse.rewrite(url);
        }

        // If they are trying to go to /download, rewrite to /app/[id]/download
        if (url.pathname === '/download') {
            url.pathname = `/app/${subdomain}/download`;
            return NextResponse.rewrite(url);
        }
    }

    return NextResponse.next();
}
