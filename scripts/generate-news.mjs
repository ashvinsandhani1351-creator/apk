import Parser from 'rss-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NEWS_DIR = path.join(__dirname, '../data/news');

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("❌ No GEMINI_API_KEY found in environment variables.");
    console.error("Please add it to your .env.local file or export it before running.");
    process.exit(1);
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const FEEDS = [
    { name: 'Android Authority', url: 'https://www.androidauthority.com/feed/', category: 'Android News' },
    { name: 'TechCrunch', url: 'https://techcrunch.com/category/apps/feed/', category: 'App Startup' },
];

const parser = new Parser({
    customFields: {
        item: [
            ['media:content', 'media'],
            ['content:encoded', 'contentEncoded']
        ]
    }
});

function generateSlug(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function generateArticleWithGemini(headline, rawSnippet, sourceName) {
    const prompt = `
    You are an expert tech blogger for a popular Android app portal called "Bitcryptpress".
    I am going to give you a recent news headline and a short snippet from ${sourceName}.
    
    Headline: "${headline}"
    Snippet: "${rawSnippet}"
    
    Your task:
    Write a 250-350 word, highly engaging, completely unique blog post about this news.
    Write in layman's terms. Be enthusiastic but objective.
    Format the post in clean Markdown (use H2s, bullet points if necessary).
    DO NOT output a title or H1 (I already have the title). Just output the body of the article.
    At the very end of the article, include a short italicized credit line like: *This news was originally reported by ${sourceName}.*
    `;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error calling Gemini API:", error.message);
        return null;
    }
}

async function run() {
    console.log("🚀 Starting AI News Generation...");

    if (!fs.existsSync(NEWS_DIR)) {
        fs.mkdirSync(NEWS_DIR, { recursive: true });
    }

    let generatedCount = 0;

    for (const feedSource of FEEDS) {
        console.log(`📡 Fetching RSS from ${feedSource.name}...`);
        try {
            const feed = await parser.parseURL(feedSource.url);
            // Process the top 3 items from each feed to save API limits
            const itemsToProcess = feed.items.slice(0, 3);

            for (const item of itemsToProcess) {
                const title = item.title || 'Untitled';
                const slug = generateSlug(title);
                const filePath = path.join(NEWS_DIR, `${slug}.md`);

                // Skip if we already generated an article for this headline
                if (fs.existsSync(filePath)) {
                    console.log(`⏩ Skipping "${title}" (Already exists)`);
                    continue;
                }

                console.log(`✍️ Generating AI article for: "${title}"`);

                let imageUrl = '';
                if (item.media && item.media['$'] && item.media['$'].url) imageUrl = item.media['$'].url;
                else if (item.contentEncoded) {
                    const imgMatch = item.contentEncoded.match(/<img[^>]+src="([^">]+)"/);
                    if (imgMatch) imageUrl = imgMatch[1];
                }

                const rawSnippet = (item.contentSnippet || item.content || '').replace(/(<([^>]+)>)/gi, "").substring(0, 300);

                const aiMarkdown = await generateArticleWithGemini(title, rawSnippet, feedSource.name);

                if (aiMarkdown) {
                    // Create Frontmatter
                    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${rawSnippet.substring(0, 150).replace(/"/g, '\\"')}..."
pubDate: "${item.pubDate || new Date().toISOString()}"
source: "${feedSource.name}"
category: "${feedSource.category}"
imageUrl: "${imageUrl}"
link: "${item.link}"
---

`;
                    fs.writeFileSync(filePath, frontmatter + aiMarkdown);
                    console.log(`✅ Saved ${slug}.md`);
                    generatedCount++;

                    // Small delay to avoid API rate limiting
                    await new Promise(r => setTimeout(r, 2000));
                }
            }
        } catch (error) {
            console.error(`❌ Failed to process ${feedSource.name}:`, error.message);
        }
    }

    console.log(`🎉 Finished! Generated ${generatedCount} new AI articles.`);
}

run();
