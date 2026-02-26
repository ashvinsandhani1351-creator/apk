const { getLatestNews } = require('./lib/news.ts');
const Parser = require('rss-parser');
const parser = new Parser({
    customFields: {
        item: [
            ['media:content', 'media'],
            ['content:encoded', 'contentEncoded']
        ]
    }
});

const FEEDS = [
    { name: 'Android Authority', url: 'https://www.androidauthority.com/feed/', category: 'Android News' },
    { name: 'TechCrunch', url: 'https://techcrunch.com/category/apps/feed/', category: 'App Startup' },
    { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', category: 'Tech Culture' },
];

async function test() {
    console.log("Testing RSS fetch...");
    const results = await Promise.allSettled(
        FEEDS.map(async (feedSource) => {
            console.log(`Fetching ${feedSource.name}...`);
            const feed = await parser.parseURL(feedSource.url);
            console.log(`Got ${feed.items.length} items from ${feedSource.name}`);
            return feed.items.length;
        })
    );

    results.forEach((r, i) => {
        if (r.status === 'rejected') {
            console.error(`Feed ${FEEDS[i].name} failed:`, r.reason.message);
        } else {
            console.log(`Feed ${FEEDS[i].name} succeeded with ${r.value} items.`);
        }
    });
}

test();
