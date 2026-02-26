import { MetadataRoute } from 'next';
import { getAllCollections } from '@/lib/collections';
import { getApps } from '@/lib/scraper';

// Define the categories we want to include in the sitemap
const categories = [
    'social', 'tools', 'communication', 'entertainment',
    'game', 'productivity', 'lifestyle', 'photography',
    'video_players', 'finance', 'shopping', 'travel_and_local'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://bitcryptpress.online';

    const sitemapEntries: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/apps`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/games`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/categories`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/collections`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // Static Info Pages
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    // Add Dynamic Category Pages
    categories.forEach(cat => {
        sitemapEntries.push({
            url: `${baseUrl}/categories/${cat}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        });
    });

    // Add Dynamic Collection Pages
    const collections = getAllCollections();
    collections.forEach(col => {
        sitemapEntries.push({
            url: `${baseUrl}/collections/${col.id}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        });
    });

    // Add Top 20 Apps (to ensure major apps are always indexed quickly)
    try {
        const topApps = await getApps('TOP_FREE', undefined, 20);
        topApps.forEach((app: any) => {
            sitemapEntries.push({
                url: `${baseUrl}/app/${app.appId}`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 0.7,
            });
        });
    } catch (e) {
        console.error("Sitemap generation error for Top Apps:", e);
    }

    return sitemapEntries;
}
