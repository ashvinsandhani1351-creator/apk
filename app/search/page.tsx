import AppCard from '@/components/AppCard';
import { searchApps } from '@/lib/scraper';

export default async function SearchPage({
    searchParams
}: {
    searchParams: Promise<{ q: string }>
}) {
    const { q } = await searchParams;
    const results = await searchApps(q || '', 30);

    return (
        <div className="flex flex-col gap-8">
            <nav style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Home » Search » {q}
            </nav>

            <section>
                <div className="flex justify-between items-center" style={{ marginBottom: '20px', borderLeft: '4px solid var(--primary-color)', paddingLeft: '15px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Search Results for: {q}</h2>
                </div>

                {results.length > 0 ? (
                    <div className="responsive-grid">
                        {results.map((app: any) => (
                            <AppCard key={app.appId} app={app} />
                        ))}
                    </div>
                ) : (
                    <div className="card py-20 text-center">
                        <p>No results found for "{q}"</p>
                    </div>
                )}
            </section>
        </div>
    );
}
