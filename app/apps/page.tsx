import AppCard from '@/components/AppCard';

async function getApps(collection: string = 'TOP_FREE', num: number = 20) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/apps?coll=${collection}&n=${num}`, {
        next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    return res.json();
}

export default async function AppsPage() {
    const topApps = await getApps('TOP_FREE', 18);
    const newApps = await getApps('NEW_FREE', 18);

    return (
        <div className="flex flex-col gap-10">
            <nav style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '-10px' }}>
                Home » Apps
            </nav>

            <section>
                <div className="section-title">
                    <h2>Top Free Apps</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topApps.map((app: any) => (
                        <AppCard key={app.appId} app={app} showDownload />
                    ))}
                </div>
            </section>

            <section>
                <div className="section-title">
                    <h2>New Free Apps</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newApps.map((app: any) => (
                        <AppCard key={app.appId} app={app} showDownload />
                    ))}
                </div>
            </section>
        </div>
    );
}
