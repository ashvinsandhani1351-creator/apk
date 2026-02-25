import fs from 'fs';
import path from 'path';

const ARTICLES_DIR = path.join(process.cwd(), 'data', 'articles');

export function getArticleOverride(appId: string): { content: string; title?: string } | null {
    try {
        const filePath = path.join(ARTICLES_DIR, `${appId}.md`);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            return { content };
        }
    } catch (error) {
        console.error('Error reading article override:', error);
    }
    return null;
}

export function saveArticleOverride(appId: string, content: string) {
    try {
        if (!fs.existsSync(ARTICLES_DIR)) {
            fs.mkdirSync(ARTICLES_DIR, { recursive: true });
        }
        const filePath = path.join(ARTICLES_DIR, `${appId}.md`);
        fs.writeFileSync(filePath, content);
    } catch (error) {
        console.error('Error saving article override:', error);
    }
}
