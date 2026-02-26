import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://bitcryptpress.online';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'], // Hide API routes and Admin dashboard from search engines
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
