import gplay from 'google-play-scraper';

export async function getApps(collection: string = 'TOP_FREE', category?: string, num: number = 20) {
    try {
        console.log(`Scraping: collection=${collection}, category=${category}, num=${num}`);

        // Map common names to gplay constants or internal strings
        const collectionMap: { [key: string]: string } = {
            'TOP_FREE': 'TOP_FREE',
            'NEW_FREE': 'TOP_FREE',
            'TOP_FREE_GAMES': 'TOP_FREE',
            'NEW_FREE_GAMES': 'TOP_FREE'
        };

        const targetCollection = collectionMap[collection] || collection;

        let targetCategory = category;
        // Only default to GAME if no specific category is provided for a GAMES collection
        if (collection.includes('GAMES') && !category) {
            targetCategory = 'GAME';
        }

        return await gplay.list({
            category: targetCategory as any,
            collection: targetCollection as any,
            num: num,
            fullDetail: true
        });
    } catch (error) {
        console.error('Scraper Error:', error);
        return [];
    }
}

export async function getDiscoverApps(num: number = 10) {
    const categories = [
        'APPLICATION', 'SOCIAL', 'COMMUNICATION', 'TOOLS', 'FINANCE',
        'SHOPPING', 'PHOTOGRAPHY', 'VIDEO_PLAYERS', 'TRAVEL_AND_LOCAL'
    ];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    return await getApps('TOP_FREE', randomCategory, num);
}

export async function getAppDetails(appId: string) {
    try {
        return await gplay.app({ appId });
    } catch (error) {
        console.error('App Detail Scraper Error:', error);
        return null;
    }
}

export async function searchApps(query: string, num: number = 20) {
    try {
        return await gplay.search({
            term: query,
            num: num,
            fullDetail: true
        });
    } catch (error) {
        console.error('Search Scraper Error:', error);
        return [];
    }
}
