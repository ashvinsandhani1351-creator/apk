const gplay = require('google-play-scraper').default;

async function test() {
    try {
        console.log('Testing categories...');
        const cats = ['COMMUNICATION', 'SOCIAL', 'GAME_ACTION', 'TOOLS'];

        for (const cat of cats) {
            console.log(`\nTesting category: ${cat}`);
            const results = await gplay.list({
                category: cat,
                collection: 'TOP_FREE',
                num: 5
            });
            console.log(`Results for ${cat}: ${results.length} apps found`);
            if (results.length > 0) {
                console.log(`First app: ${results[0].title}`);
            }
        }
    } catch (e) {
        console.error('Test Failed:', e);
    }
}

test();
