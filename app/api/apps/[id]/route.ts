import { NextResponse } from 'next/server';

let gplay: any;
try {
    gplay = require('google-play-scraper');
    if (gplay.default) gplay = gplay.default;
} catch (e) {
    console.error('Failed to require google-play-scraper');
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: appId } = await params;

    if (!appId) {
        return NextResponse.json({ error: 'App ID is required' }, { status: 400 });
    }

    if (!gplay) {
        return NextResponse.json({ error: 'Scraper not initialized' }, { status: 500 });
    }

    try {
        const app = await gplay.app({ appId });
        return NextResponse.json(app);
    } catch (error: any) {
        console.error('App Detail Scraper Error Detail:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
