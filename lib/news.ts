import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface NewsItem {
    id: string; // The URL slug (filename)
    title: string;
    link: string;
    pubDate: string;
    description: string;
    source: string;
    category: string;
    imageUrl?: string;
    content: string; // The full AI-generated markdown content
}

const newsDirectory = path.join(process.cwd(), 'data', 'news');

// Ensure directory exists
if (!fs.existsSync(newsDirectory)) {
    fs.mkdirSync(newsDirectory, { recursive: true });
}

export async function getLatestNews(): Promise<NewsItem[]> {
    try {
        const fileNames = fs.readdirSync(newsDirectory);
        const allNews = fileNames
            .filter(fileName => fileName.endsWith('.md'))
            .map(fileName => {
                const id = fileName.replace(/\.md$/, '');
                const fullPath = path.join(newsDirectory, fileName);
                const fileContents = fs.readFileSync(fullPath, 'utf8');

                // Use gray-matter to parse the metadata section
                const matterResult = matter(fileContents);

                return {
                    id,
                    content: matterResult.content,
                    ...(matterResult.data as Omit<NewsItem, 'id' | 'content'>)
                };
            });

        // Sort posts by date
        return allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    } catch (e) {
        console.error("Error reading news directory:", e);
        return [];
    }
}

export async function getNewsItemBySlug(slug: string): Promise<NewsItem | null> {
    const fullPath = path.join(newsDirectory, `${slug}.md`);
    try {
        if (!fs.existsSync(fullPath)) return null;

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            id: slug,
            content: matterResult.content,
            ...(matterResult.data as Omit<NewsItem, 'id' | 'content'>)
        };
    } catch (e) {
        console.error(`Error reading article ${slug}:`, e);
        return null;
    }
}
