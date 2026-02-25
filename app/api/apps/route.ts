import { NextResponse } from 'next/server';

// Robust import for google-play-scraper
let gplay: any;
try {
    gplay = require('google-play-scraper');
    if (gplay.default) gplay = gplay.default;
} catch (e) {
    console.error('Failed to require google-play-scraper, trying import...');
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('cat') || undefined;
    const collection = searchParams.get('coll') || 'TOP_FREE';
    const num = parseInt(searchParams.get('n') || '20');

    if (!gplay) {
        return NextResponse.json({ error: 'Scraper not initialized' }, { status: 500 });
    }

    try {
        let results;
        if (query) {
            results = await gplay.search({
                term: query,
                num: num,
                fullDetail: true
            });
        } else {
            console.log(`Fetching from collection: ${collection}, category: ${category}`);

            // Map common names to gplay constants or internal strings
            const collectionMap: { [key: string]: string } = {
                'TOP_FREE': 'TOP_FREE',
                'NEW_FREE': 'TOP_FREE', // NEW_FREE is often unstable, better to fallback to TOP_FREE for now
                'TOP_FREE_GAMES': 'TOP_FREE',
                'NEW_FREE_GAMES': 'TOP_FREE'
            };

            const targetCollection = collectionMap[collection] || collection;

            // If the collection name implies games, force the GAME category
            // Otherwise use the provided category or default to undefined (All)
            let targetCategory = category;
            if (collection.includes('GAMES')) {
                targetCategory = 'GAME';
            }

            console.log(`Resolved to gplay collection: ${targetCollection}, category: ${targetCategory}`);

            results = await gplay.list({
                category: targetCategory,
                collection: targetCollection,
                num: num,
                fullDetail: true
            });
        }

        return NextResponse.json(results);
    } catch (error: any) {
        console.error('Scraper Error Detail:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
