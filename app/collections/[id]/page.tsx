import { getCollectionData } from '@/lib/collections';
import { getAppDetails } from '@/lib/scraper';
import AppCard from '@/components/AppCard';
import { Sparkles } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const collectionData = getCollectionData(id);

    if (!collectionData) {
        return { title: 'Collection Not Found' };
    }

    return {
        title: `${collectionData.title} - Bitcryptpress`,
        description: collectionData.description,
        keywords: collectionData.seo_keywords,
    };
}

export default async function CollectionDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const collectionData = getCollectionData(id);

    if (!collectionData) {
        return <div className="container py-20 text-center">Collection not found</div>;
    }

    // Fetch details for all apps in the collection
    const appsData = await Promise.all(
        (collectionData.package_ids || []).map(async (packageId) => {
            return await getAppDetails(packageId);
        })
    );

    // Filter out any apps that failed to load
    const validApps = appsData.filter(app => app !== null);

    return (
        <div className="flex flex-col gap-10 max-w-4xl mx-auto py-10">
            <nav style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Home » Collections » {collectionData.title}
            </nav>

            <header className="card" style={{ backgroundColor: '#f0f7ff', border: 'none', textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--primary-color)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, marginBottom: '20px' }}>
                    <Sparkles size={16} /> EXPERT CURATED
                </div>
                <h1 style={{ fontSize: '38px', fontWeight: 800, marginBottom: '15px', color: '#111' }}>{collectionData.title}</h1>
                <p style={{ fontSize: '18px', color: '#444', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
                    {collectionData.description}
                </p>
            </header>

            {/* SEO Content Body */}
            {collectionData.contentHTML && (
                <article
                    className="card human-article"
                    dangerouslySetInnerHTML={{ __html: collectionData.contentHTML }}
                />
            )}

            <section>
                <div className="section-title">
                    <h2>Apps in this Collection</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {validApps.map((app: any) => (
                        <AppCard key={app.appId} app={app} showDownload />
                    ))}

                    {validApps.length === 0 && (
                        <p className="col-span-2 text-center text-muted py-10">Searching for the best apps...</p>
                    )}
                </div>
            </section>
        </div>
    );
}
