import { getAppDetails } from '@/lib/scraper';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Download, Star } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const match = slug.match(/^(.+)-vs-(.+)$/);
    if (!match) return { title: 'Comparison Not Found' };

    const [, id1, id2] = match;
    try {
        const [app1, app2] = await Promise.all([
            getAppDetails(id1).catch(() => null),
            getAppDetails(id2).catch(() => null)
        ]);

        if (!app1 || !app2) {
            return { title: 'App Comparison Not Found' };
        }

        return {
            title: `Which is better? ${app1.title} vs ${app2.title} - Full Comparison`,
            description: `Compare ${app1.title} and ${app2.title} side-by-side. See differences in ratings, features, and downloads to decide which app is best for you.`,
            keywords: `${app1.title} vs ${app2.title}, compare ${app1.title} ${app2.title}, best alternative to ${app1.title}`,
        };
    } catch {
        return { title: 'App Comparison' };
    }
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Parse slug: e.g. com.whatsapp-vs-org.telegram.messenger
    const match = slug.match(/^(.+)-vs-(.+)$/);

    if (!match) {
        notFound();
    }

    const id1 = match[1];
    const id2 = match[2];

    const [app1, app2] = await Promise.all([
        getAppDetails(id1).catch(() => null),
        getAppDetails(id2).catch(() => null)
    ]);

    if (!app1 || !app2) {
        return (
            <div className="container py-20 text-center">
                <h2>Comparison not available</h2>
                <p className="text-muted mt-4">One or both of these apps could not be found.</p>
                <Link href="/" className="btn-primary inline-block mt-8">Return Home</Link>
            </div>
        );
    }

    const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);

    return (
        <div className="flex flex-col gap-10 max-w-5xl mx-auto py-10">
            <nav style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link> » Compare » {app1.title} vs {app2.title}
            </nav>

            <header className="card" style={{ backgroundColor: '#fff', border: '1px solid #eaeaea', textAlign: 'center', padding: '40px 20px' }}>
                <h1 style={{ fontSize: '38px', fontWeight: 800, marginBottom: '15px', color: '#111' }}>
                    <span style={{ color: 'var(--primary-color)' }}>{app1.title}</span> vs <span style={{ color: '#4caf50' }}>{app2.title}</span>
                </h1>
                <p style={{ fontSize: '18px', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
                    Not sure which one to download? Compare head-to-head stats to find the perfect fit for your Android device.
                </p>
            </header>

            <section className="grid md:grid-cols-2 gap-8">
                {/* App 1 Column */}
                <div className="card flex flex-col gap-6 items-center text-center">
                    <Image src={app1.icon} alt={app1.title} width={120} height={120} className="rounded-2xl shadow-md" />
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 700 }}>{app1.title}</h2>
                        <p style={{ color: 'var(--primary-color)', fontWeight: 600 }}>{app1.developer}</p>
                    </div>

                    <div style={{ width: '100%', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-muted">Rating</span>
                            <span className="flex items-center gap-1 font-bold"><Star size={16} fill="#ffc107" color="#ffc107" /> {app1.scoreText}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-muted">Installs</span>
                            <span className="font-bold">{app1.installs}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-muted">Size</span>
                            <span className="font-bold">{app1.size || 'Varies'}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-muted">Category</span>
                            <span className="font-bold">{app1.genre}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-muted">Content Rating</span>
                            <span className="font-bold">{app1.contentRating}</span>
                        </div>
                    </div>

                    <Link href={`/app/${app1.appId}`} className="btn-primary w-full text-center py-3" style={{ textDecoration: 'none' }}>
                        View Details & Download
                    </Link>
                </div>

                {/* App 2 Column */}
                <div className="card flex flex-col gap-6 items-center text-center">
                    <Image src={app2.icon} alt={app2.title} width={120} height={120} className="rounded-2xl shadow-md" />
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 700 }}>{app2.title}</h2>
                        <p style={{ color: '#4caf50', fontWeight: 600 }}>{app2.developer}</p>
                    </div>

                    <div style={{ width: '100%', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-muted">Rating</span>
                            <span className="flex items-center gap-1 font-bold"><Star size={16} fill="#ffc107" color="#ffc107" /> {app2.scoreText}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-muted">Installs</span>
                            <span className="font-bold">{app2.installs}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-muted">Size</span>
                            <span className="font-bold">{app2.size || 'Varies'}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-muted">Category</span>
                            <span className="font-bold">{app2.genre}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-muted">Content Rating</span>
                            <span className="font-bold">{app2.contentRating}</span>
                        </div>
                    </div>

                    <Link href={`/app/${app2.appId}`} className="btn-primary w-full text-center py-3" style={{ textDecoration: 'none', backgroundColor: '#4caf50' }}>
                        View Details & Download
                    </Link>
                </div>
            </section>

            <section className="card" style={{ backgroundColor: '#f9f9f9' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '15px' }}>
                    <ShieldCheck size={24} style={{ display: 'inline', color: 'var(--primary-color)', marginRight: '8px' }} />
                    Our Verdict
                </h3>
                <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>
                    Both <strong>{app1.title}</strong> and <strong>{app2.title}</strong> offer excellent features within the {app1.genre} category.
                    {app1.score > app2.score ? ` However, based on user ratings, ${app1.title} has a slight edge in community satisfaction.` : ` However, based on user ratings, ${app2.title} has a slight edge in community satisfaction.`}
                    Ultimately, your choice depends on your specific workflow and feature preferences. We recommend trying both to see which interface you prefer.
                </p>
            </section>
        </div>
    );
}
