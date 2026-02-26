import Link from 'next/link';
import Image from 'next/image';
import { getLatestNews } from '@/lib/news';
import { Newspaper, ExternalLink } from 'lucide-react';

export const metadata = {
    title: 'Latest Tech & App News - Bitcryptpress',
    description: 'Get the latest daily updates on Android apps, tech startups, and gadget culture powered by top industry sources.',
};

export const revalidate = 3600; // Cache the news for 1 hour to prevent rate limiting

export default async function NewsIndex() {
    const news = await getLatestNews();

    return (
        <div className="flex flex-col gap-10 max-w-6xl mx-auto py-10">
            <nav style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Home » News
            </nav>

            <section className="text-center md:text-left flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-gray-100">
                <div style={{ backgroundColor: '#fff3e0', padding: '20px', borderRadius: '50%', color: '#ff9800' }}>
                    <Newspaper size={40} />
                </div>
                <div>
                    <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '10px' }}>Tech & App News</h1>
                    <p style={{ fontSize: '18px', color: 'var(--text-muted)' }}>
                        Daily updates from our favorite tech publications, aggregated in one place.
                    </p>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => (
                    <Link
                        key={item.id}
                        href={`/news/${item.id}`}
                        className="card hover-lift flex flex-col overflow-hidden"
                        style={{ textDecoration: 'none', color: 'inherit', padding: 0 }}
                    >
                        {item.imageUrl ? (
                            <div style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: '#f0f0f0' }}>
                                {/* Using unoptimized standard img if external domains aren't all mapped in next.config */}
                                <img src={item.imageUrl} alt={item.title} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                            </div>
                        ) : (
                            <div style={{ width: '100%', height: '200px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Newspaper size={48} color="#94a3b8" />
                            </div>
                        )}

                        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff', backgroundColor: 'var(--primary-color)', padding: '4px 10px', borderRadius: '12px' }}>
                                    {item.category}
                                </span>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>By {item.source}</span>
                            </div>

                            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px', lineHeight: '1.3' }}>{item.title}</h2>
                            <p style={{ color: 'var(--text-main)', fontSize: '14px', lineHeight: '1.6', flex: 1 }}>{item.contentSnippet}</p>

                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm" style={{ color: 'var(--text-muted)' }}>
                                <span>{new Date(item.pubDate).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1 text-primary font-semibold">Read More <ExternalLink size={14} /></span>
                            </div>
                        </div>
                    </Link>
                ))}

                {news.length === 0 && (
                    <div className="col-span-3 text-center py-20 text-gray-400">
                        Unable to load news at this time. Please check back later.
                    </div>
                )}
            </section>
        </div>
    );
}
