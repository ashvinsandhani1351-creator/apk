import AppCard from '@/components/AppCard';
import { getApps } from '@/lib/scraper';

export default async function GamesPage() {
    const topGames = await getApps('TOP_FREE_GAMES', undefined, 18);
    const newGames = await getApps('NEW_FREE_GAMES', undefined, 18);

    return (
        <div className="flex flex-col gap-10">
            <nav style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '-10px' }}>
                Home » Games
            </nav>

            <section>
                <div className="section-title">
                    <h2>Top Free Games</h2>
                </div>
                <div className="responsive-grid">
                    {topGames.map((app: any) => (
                        <AppCard key={app.appId} app={app} showDownload />
                    ))}
                </div>
            </section>

            <section>
                <div className="section-title">
                    <h2>New Free Games</h2>
                </div>
                <div className="responsive-grid">
                    {newGames.map((app: any) => (
                        <AppCard key={app.appId} app={app} showDownload />
                    ))}
                </div>
            </section>
        </div>
    );
}
