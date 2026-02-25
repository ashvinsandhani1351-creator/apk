import { NextResponse } from 'next/server';
import { getPinnedIds, savePinnedIds } from '@/lib/pins';

export async function GET() {
    return NextResponse.json(getPinnedIds());
}

export async function POST(request: Request) {
    const { appId, action } = await request.json();
    let pins = getPinnedIds();

    if (action === 'add') {
        if (!pins.includes(appId)) pins.push(appId);
    } else if (action === 'remove') {
        pins = pins.filter((id: string) => id !== appId);
    }

    savePinnedIds(pins);
    return NextResponse.json(pins);
}
