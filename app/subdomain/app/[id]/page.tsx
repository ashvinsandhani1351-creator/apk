import { Download, Star, Info, ShieldCheck, Share2 } from 'lucide-react';
import Link from 'next/link';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import { getAppDetails } from '@/lib/scraper';
import { getArticleOverride } from '@/lib/articles';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const app = await getAppDetails(id);
    if (!app) return { title: 'App Not Found - Bitcryptpress' };

    return {
        title: `${app.title} MOD APK (Latest Version) - Bitcryptpress`,
        description: `Download ${app.title} MOD APK for Android. ${app.summary || app.description.substring(0, 150)}...`,
        openGraph: {
            images: [app.icon],
        },
    };
}

export default async function SubdomainAppDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const app = await getAppDetails(id);

    if (!app) {
        return <div className="container py-20 text-center">App not found</div>;
    }

    const articleOverride = getArticleOverride(id);

    return (
        <div className="subdomain-container">
            {/* Hero Section Container */}
            <div className="sd-hero">
                <div className="sd-hero-content">
                    <img
                        src={app.icon}
                        alt={app.title}
                        className="sd-app-icon"
                    />
                    <div className="sd-app-header">
                        <h1 className="sd-app-title">{app.title} MOD APK</h1>
                        <p className="sd-app-developer">{app.developer}</p>
                        <div className="sd-app-meta">
                            <span className="sd-meta-item"><Star size={14} fill="#fbc02d" color="#fbc02d" /> {app.scoreText || '4.5'}</span>
                            <span className="sd-meta-item">|</span>
                            <span className="sd-meta-item">{app.version}</span>
                        </div>
                    </div>
                </div>

                <Link href={`/subdomain/app/${id}/download`} className="sd-download-btn">
                    <Download size={24} />
                    <div className="sd-btn-text">
                        <span className="sd-btn-title">{app.title} APK</span>
                        <span className="sd-btn-subtitle">Download For Android</span>
                    </div>
                </Link>
            </div>

            {/* Screenshots */}
            <div className="sd-screenshots-wrapper">
                <ScreenshotGallery screenshots={app.screenshots} />
            </div>

            {/* App Info Card */}
            <div className="sd-info-card">
                <h2 className="sd-info-title">More About {app.title}</h2>
                <div className="sd-info-table">
                    <div className="sd-info-row">
                        <span className="sd-info-label">Name</span>
                        <span className="sd-info-value">{app.title}</span>
                    </div>
                    <div className="sd-info-row">
                        <span className="sd-info-label">Package Name</span>
                        <span className="sd-info-value">{id}</span>
                    </div>
                    <div className="sd-info-row">
                        <span className="sd-info-label">Category</span>
                        <span className="sd-info-value" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>{app.genre || 'App'} &gt;</span>
                    </div>
                    <div className="sd-info-row">
                        <span className="sd-info-label">MOD Features</span>
                        <span className="sd-info-value">{articleOverride ? 'Unlimited Everything' : 'Original APK'}</span>
                    </div>
                    <div className="sd-info-row">
                        <span className="sd-info-label">Version</span>
                        <span className="sd-info-value">{app.version}</span>
                    </div>
                    <div className="sd-info-row">
                        <span className="sd-info-label">Size</span>
                        <span className="sd-info-value">{app.size || 'Varies'}</span>
                    </div>
                    <div className="sd-info-row">
                        <span className="sd-info-label">Requires Android</span>
                        <span className="sd-info-value">5.0 and up</span>
                    </div>
                    <div className="sd-info-row">
                        <span className="sd-info-label">Last Updated</span>
                        <span className="sd-info-value">{app.updated}</span>
                    </div>
                </div>

                {/* Social Share Icons Placeholder */}
                <div className="sd-social-share">
                    <span className="sd-share-icon" style={{ backgroundColor: '#0088cc' }}>TG</span>
                    <span className="sd-share-icon" style={{ backgroundColor: '#3b5998' }}>FB</span>
                    <span className="sd-share-icon" style={{ backgroundColor: '#25D366' }}>WA</span>
                    <span className="sd-share-icon" style={{ backgroundColor: '#FF4500' }}>RD</span>
                    <span className="sd-share-icon" style={{ backgroundColor: '#1DA1F2' }}>TW</span>
                </div>
            </div>

            {/* Main Content Article */}
            <div className="sd-article-content">
                {articleOverride ? (
                    <div dangerouslySetInnerHTML={{ __html: articleOverride.content }} />
                ) : (
                    <>
                        <p>{app.summary}</p>
                        <h2>Features of {app.title} for Android</h2>
                        <div dangerouslySetInnerHTML={{ __html: app.descriptionHTML }} />
                    </>
                )}
            </div>

            {/* Bottom Download Section (Optional to match target) */}
            <div className="sd-bottom-download">
                <Link href={`/subdomain/app/${id}/download`} className="sd-download-btn outline">
                    <Download size={20} />
                    <span>Go To Download Page</span>
                </Link>
            </div>

        </div>
    );
}
