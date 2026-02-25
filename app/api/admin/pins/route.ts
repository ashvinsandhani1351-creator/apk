import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PINS_FILE = path.join(process.cwd(), 'data', 'pins.json');

function getPins() {
    if (!fs.existsSync(PINS_FILE)) return [];
    return JSON.parse(fs.readFileSync(PINS_FILE, 'utf8'));
}

function savePins(pins: string[]) {
    fs.writeFileSync(PINS_FILE, JSON.stringify(pins, null, 2));
}

export async function GET() {
    return NextResponse.json(getPins());
}

export async function POST(request: Request) {
    const { appId, action } = await request.json();
    let pins = getPins();

    if (action === 'add') {
        if (!pins.includes(appId)) pins.push(appId);
    } else if (action === 'remove') {
        pins = pins.filter((id: string) => id !== appId);
    }

    savePins(pins);
    return NextResponse.json(pins);
}
