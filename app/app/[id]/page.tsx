import { Download, Star, Users, Info, Calendar } from 'lucide-react';
import Link from 'next/link';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import { getAppDetails } from '@/lib/scraper';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const app = await getAppDetails(id);
    if (!app) return { title: 'App Not Found - Techylist' };

    return {
        title: `${app.title} APK Download (Latest Version) - Techylist`,
        description: `Download ${app.title} APK for Android. ${app.summary || app.description.substring(0, 150)}...`,
        openGraph: {
            images: [app.icon],
        },
    };
}

export default async function AppDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const app = await getAppDetails(id);

    if (!app) {
        return <div className="container py-20 text-center">App not found</div>;
    }

    return (
        <div className="flex flex-col gap-8">
            {/* Breadcrumbs */}
            <nav style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Home » {app.genre || 'App'} » {app.title}
            </nav>

            {/* Hero Section */}
            <div className="card flex flex-col md:flex-row gap-8 items-start md:items-center">
                <img
                    src={app.icon}
                    alt={app.title}
                    style={{ width: '120px', height: '120px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '5px' }}>{app.title}</h1>
                    <p style={{ fontSize: '18px', color: 'var(--primary-color)', fontWeight: 500, marginBottom: '15px' }}>
                        {app.developer}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span className="flex items-center gap-1"><Star size={16} fill="#fbc02d" color="#fbc02d" /> {app.scoreText}</span>
                        <span className="flex items-center gap-1"><Download size={16} /> {app.installs}</span>
                        <span className="flex items-center gap-1"><Calendar size={16} /> Updated: {app.updated}</span>
                    </div>
                </div>
                <Link
                    href={`/app/${id}/download`}
                    className="btn-primary"
                    style={{ padding: '15px 30px', fontSize: '18px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <Download size={20} /> Download APK ({app.size || 'Varies'})
                </Link>
            </div>

            {/* Screenshots */}
            <ScreenshotGallery screenshots={app.screenshots} />

            {/* Description */}
            <section className="card">
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>About this app</h2>
                <div
                    style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}
                    dangerouslySetInnerHTML={{ __html: app.descriptionHTML }}
                />
            </section>

            {/* Details Table */}
            <section className="card">
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Additional Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between border-bottom pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ fontWeight: 500 }}>Genre</span>
                        <span>{app.genre || 'App'}</span>
                    </div>
                    <div className="flex justify-between border-bottom pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ fontWeight: 500 }}>Initial Release</span>
                        <span>{app.released}</span>
                    </div>
                    <div className="flex justify-between border-bottom pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ fontWeight: 500 }}>Version</span>
                        <span>{app.version}</span>
                    </div>
                    <div className="flex justify-between border-bottom pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ fontWeight: 500 }}>Content Rating</span>
                        <span>{app.contentRating}</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
