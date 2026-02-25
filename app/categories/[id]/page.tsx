import AppCard from '@/components/AppCard';

async function getCategoryApps(category: string, num: number = 24) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/apps?cat=${category.toUpperCase()}&n=${num}`, {
        next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    return res.json();
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const apps = await getCategoryApps(id);

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
