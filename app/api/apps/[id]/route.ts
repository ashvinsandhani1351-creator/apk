import { NextResponse } from 'next/server';
import { getAppDetails } from '@/lib/scraper';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: appId } = await params;

    if (!appId) {
        return NextResponse.json({ error: 'App ID is required' }, { status: 400 });
    }

    try {
        const app = await getAppDetails(appId);
        if (!app) {
            return NextResponse.json({ error: 'App not found' }, { status: 404 });
        }
        return NextResponse.json(app);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
