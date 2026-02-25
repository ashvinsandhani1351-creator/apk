import AppCard from '@/components/AppCard';
import { getApps } from '@/lib/scraper';

export default async function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const apps = await getApps('TOP_FREE', id.toUpperCase(), 24);

    return (
        <div className="flex flex-col gap-10">
            <nav style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '-10px' }}>
                Home » Categories » {id.charAt(0).toUpperCase() + id.slice(1).replace('_', ' ')}
            </nav>

            <section>
                <div className="section-title">
                    <h2>{id.toUpperCase().replace('_', ' ')} Apps</h2>
                </div>

                {apps.length > 0 ? (
                    <div className="responsive-grid">
                        {apps.map((app: any) => (
                            <AppCard key={app.appId} app={app} showDownload />
                        ))}
                    </div>
                ) : (
                    <div className="card py-20 text-center text-muted">
                        No apps found in this category.
                    </div>
                )}
            </section>
        </div>
    );
}
