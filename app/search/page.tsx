import AppCard from '@/components/AppCard';

async function searchApps(query: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/apps?q=${query}`, {
        cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
}

export default async function SearchPage({
    searchParams
}: {
    searchParams: Promise<{ q: string }>
}) {
    const { q } = await searchParams;
    const results = await searchApps(q || '');

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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
