import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const collectionsDirectory = path.join(process.cwd(), 'data/collections');

export interface CollectionData {
    id: string;
    title: string;
    description: string;
    seo_keywords: string;
    package_ids: string[];
    contentHTML?: string;
}

export function getAllCollectionIds() {
    if (!fs.existsSync(collectionsDirectory)) return [];

    const fileNames = fs.readdirSync(collectionsDirectory);
    return fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => ({
            id: fileName.replace(/\.md$/, ''),
        }));
}

export function getCollectionData(id: string): CollectionData | null {
    const fullPath = path.join(collectionsDirectory, `${id}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const packageIds = matterResult.data.package_ids
        ? matterResult.data.package_ids.split(',').map((bid: string) => bid.trim())
        : [];

    return {
        id,
        title: matterResult.data.title || 'Collection',
        description: matterResult.data.description || '',
        seo_keywords: matterResult.data.seo_keywords || '',
        package_ids: packageIds,
        contentHTML: matterResult.content, // Raw markdown for now, can be parsed later if needed
    };
}

export function getAllCollections(): CollectionData[] {
    const fileNames = fs.existsSync(collectionsDirectory) ? fs.readdirSync(collectionsDirectory) : [];

    const allCollectionsData = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const id = fileName.replace(/\.md$/, '');
            return getCollectionData(id);
        })
        .filter(data => data !== null) as CollectionData[];

    return allCollectionsData;
}
