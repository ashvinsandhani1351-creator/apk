'use client';

interface ScreenshotGalleryProps {
    screenshots: string[];
}

export default function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
    if (!screenshots || screenshots.length === 0) return null;

    return (
        <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Screenshots</h2>
            <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
                {screenshots.map((src, i) => {
                    const cleanSrc = src.startsWith('http') ? src : `https:${src}`;
                    return (
                        <img
                            key={i}
                            src={cleanSrc}
                            alt={`Screenshot ${i}`}
                            style={{ height: '400px', borderRadius: '12px', flexShrink: 0, border: '1px solid var(--border-color)' }}
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    );
                })}
            </div>
        </section>
    );
}
