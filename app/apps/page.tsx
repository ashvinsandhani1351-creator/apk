import AppCard from '@/components/AppCard';
import { getApps } from '@/lib/scraper';

export default async function AppsPage() {
    const topApps = await getApps('TOP_FREE', undefined, 18);
    const newApps = await getApps('NEW_FREE', undefined, 18);

    return (
        <div className="flex flex-col gap-10">
            <nav style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '-10px' }}>
                Home » Apps
            </nav>

            <section>
                <div className="section-title">
                    <h2>Top Free Apps</h2>
                </div>
                <div className="responsive-grid">
                    {topApps.map((app: any) => (
                        <AppCard key={app.appId} app={app} showDownload />
                    ))}
                </div>
            </section>

            <section>
                <div className="section-title">
                    <h2>New Free Apps</h2>
                </div>
                <div className="responsive-grid">
                    {newApps.map((app: any) => (
                        <AppCard key={app.appId} app={app} showDownload />
                    ))}
                </div>
            </section>
        </div>
    );
}
