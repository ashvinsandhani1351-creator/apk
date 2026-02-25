import fs from 'fs';
import path from 'path';

const PINS_FILE = path.join(process.cwd(), 'data', 'pins.json');

export function getPinnedIds(): string[] {
    try {
        if (!fs.existsSync(PINS_FILE)) {
            const dataDir = path.dirname(PINS_FILE);
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }
            fs.writeFileSync(PINS_FILE, JSON.stringify([], null, 2));
            return [];
        }
        return JSON.parse(fs.readFileSync(PINS_FILE, 'utf8'));
    } catch (error) {
        console.error('Pins sync error:', error);
        return [];
    }
}

export function savePinnedIds(pins: string[]) {
    try {
        const dataDir = path.dirname(PINS_FILE);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(PINS_FILE, JSON.stringify(pins, null, 2));
    } catch (error) {
        console.error('Save pins error:', error);
    }
}
