import AppCard from '@/components/AppCard';

async function getGames(collection: string = 'TOP_FREE_GAMES', num: number = 20) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/apps?coll=${collection}&n=${num}`, {
        next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    return res.json();
}

export default async function GamesPage() {
    const topGames = await getGames('TOP_FREE_GAMES', 18);
    const newGames = await getGames('NEW_FREE_GAMES', 18);

    return (
        <div className="flex flex-col gap-10">
            <nav style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '-10px' }}>
                Home » Games
            </nav>

            <section>
                <div className="section-title">
                    <h2>Top Free Games</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topGames.map((app: any) => (
                        <AppCard key={app.appId} app={app} showDownload />
                    ))}
                </div>
            </section>

            <section>
                <div className="section-title">
                    <h2>New Free Games</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newGames.map((app: any) => (
                        <AppCard key={app.appId} app={app} showDownload />
                    ))}
                </div>
            </section>
        </div>
    );
}
