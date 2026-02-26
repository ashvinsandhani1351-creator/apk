import { getNewsItemBySlug } from '@/lib/news';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Newspaper, ExternalLink, ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getNewsItemBySlug(slug);

    if (!article) return { title: 'Article Not Found' };

    return {
        title: `${article.title} - Bitcryptpress News`,
        description: article.contentSnippet,
    };
}

export const revalidate = 3600;

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getNewsItemBySlug(slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-8 max-w-3xl mx-auto py-10">
            <nav style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link href="/news" className="flex items-center gap-1 hover:text-primary transition-colors" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <ArrowLeft size={16} /> Back to News
                </Link>
            </nav>

            <article className="card" style={{ padding: '0', overflow: 'hidden' }}>
                {article.imageUrl && (
                    <div style={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0' }}>
                        <img src={article.imageUrl} alt={article.title} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    </div>
                )}

                <div style={{ padding: '40px' }}>
                    <header className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff', backgroundColor: 'var(--primary-color)', padding: '4px 12px', borderRadius: '12px' }}>
                                {article.category}
                            </span>
                            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                                Source: <strong>{article.source}</strong>
                            </span>
                            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                                • {new Date(article.pubDate).toLocaleDateString()}
                            </span>
                        </div>

                        <h1 style={{ fontSize: '32px', fontWeight: 800, lineHeight: '1.3', color: '#111' }}>
                            {article.title}
                        </h1>
                    </header>

                    <div style={{ fontSize: '18px', lineHeight: '1.8', color: '#444', marginBottom: '30px' }}>
                        <p>{article.contentSnippet}</p>
                    </div>

                    <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <Newspaper size={32} color="var(--primary-color)" style={{ margin: '0 auto 10px' }} />
                        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Continue Reading</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>This is a summary of an article provided by {article.source}. To read the full story, visit the original publication.</p>
                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-2" style={{ textDecoration: 'none' }}>
                            Read Full Story <ExternalLink size={18} />
                        </a>
                    </div>
                </div>
            </article>
        </div>
    );
}
