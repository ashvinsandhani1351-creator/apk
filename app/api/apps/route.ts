import { NextResponse } from 'next/server';
import { getApps, searchApps } from '@/lib/scraper';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('cat') || undefined;
    const collection = searchParams.get('coll') || 'TOP_FREE';
    const num = parseInt(searchParams.get('n') || '20');

    try {
        let results;
        if (query) {
            results = await searchApps(query, num);
        } else {
            results = await getApps(collection, category, num);
        }
        return NextResponse.json(results);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
