import Parser from 'rss-parser';

type FeedSource = {
    name: string;
    url: string;
    category: string;
};

// Curated list of high-quality app/tech news feeds
const FEEDS: FeedSource[] = [
    { name: 'Android Authority', url: 'https://www.androidauthority.com/feed/', category: 'Android News' },
    { name: 'TechCrunch', url: 'https://techcrunch.com/category/apps/feed/', category: 'App Startup' },
    { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', category: 'Tech Culture' },
];

export interface NewsItem {
    id: string; // The URL slug
    title: string;
    link: string;
    pubDate: string;
    contentSnippet: string;
    source: string;
    category: string;
    imageUrl?: string;
}

const parser = new Parser({
    customFields: {
        item: [
            ['media:content', 'media'],
            ['content:encoded', 'contentEncoded']
        ]
    }
});

// Helper to generate a URL-safe slug from a title
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

export async function getLatestNews(): Promise<NewsItem[]> {
    const allNews: NewsItem[] = [];

    // Fetch all feeds concurrently, handling individual failures gracefully
    const results = await Promise.allSettled(
        FEEDS.map(async (feedSource) => {
            const feed = await parser.parseURL(feedSource.url);

            return feed.items.slice(0, 15).map(item => { // Limit to 15 items per feed to avoid bloat
                // Try to extract an image from various common RSS structures
                let imageUrl = undefined;
                if (item.media && item.media['$'] && item.media['$'].url) {
                    imageUrl = item.media['$'].url;
                } else if (item.contentEncoded) {
                    const imgMatch = item.contentEncoded.match(/<img[^>]+src="([^">]+)"/);
                    if (imgMatch) imageUrl = imgMatch[1];
                } else if (item.content) {
                    const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
                    if (imgMatch) imageUrl = imgMatch[1];
                }

                // Clean up snippet (remove HTML tags)
                let cleanSnippet = (item.contentSnippet || item.content || '').replace(/(<([^>]+)>)/gi, "");
                if (cleanSnippet.length > 200) {
                    cleanSnippet = cleanSnippet.substring(0, 200) + '...';
                }

                return {
                    id: generateSlug(item.title || 'untitled-news-item'),
                    title: item.title || 'Untitled',
                    link: item.link || '',
                    pubDate: item.pubDate || new Date().toISOString(),
                    contentSnippet: cleanSnippet,
                    source: feedSource.name,
                    category: feedSource.category,
                    imageUrl,
                } as NewsItem;
            });
        })
    );

    results.forEach(result => {
        if (result.status === 'fulfilled') {
            allNews.push(...result.value);
        } else {
            console.error("Failed to fetch an RSS feed:", result.reason);
        }
    });

    // Sort all aggregated news by date, newest first
    return allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}

export async function getNewsItemBySlug(slug: string): Promise<NewsItem | null> {
    const allNews = await getLatestNews();
    return allNews.find(item => item.id === slug) || null;
}
