import { getAppDetails } from '@/lib/scraper';
import DownloadTimer from '@/components/DownloadTimer';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const app = await getAppDetails(id);
    if (!app) return { title: 'Download Not Found' };

    return {
        title: `Downloading ${app.title} APK (Secure) - Bitcryptpress`,
        description: `Preparing your secure download link for ${app.title}. Free and safe APK download.`,
    };
}

export default async function DownloadPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const app = await getAppDetails(id);

    if (!app) {
        return <div className="container py-20 text-center">App not found</div>;
    }

    return (
        <div className="container">
            <DownloadTimer
                appId={id}
                appName={app.title}
                appIcon={app.icon}
            />
        </div>
    );
}
