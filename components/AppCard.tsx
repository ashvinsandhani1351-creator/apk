import Link from 'next/link';

interface AppCardProps {
    app: {
        appId: string;
        title: string;
        icon: string;
        developer: string;
        scoreText?: string;
        version?: string;
    };
    variant?: 'compact' | 'vertical';
    showDownload?: boolean;
}

export default function AppCard({ app, variant = 'compact', showDownload = false }: AppCardProps) {
    const installs = app.appId.length * 10 + 'M+';

    if (variant === 'vertical') {
        return (
            <Link href={`/app/${app.appId}`} className="card items-center text-center gap-4">
                <img
                    src={app.icon}
                    alt={app.title}
                    style={{ width: '96px', height: '96px', borderRadius: '24px', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
                />
                <div style={{ width: '100%', minWidth: 0 }}>
                    <div style={{ marginBottom: '8px' }}>
                        <span className="badge">Apps</span>
                    </div>
                    <h3 style={{
                        fontSize: '17px',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginBottom: '4px',
                        color: '#000'
                    }}>
                        {app.title}
                    </h3>
                    <p style={{
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                        fontWeight: 500,
                        marginBottom: '8px'
                    }}>
                        {app.developer}
                    </p>
                    {app.scoreText && (
                        <div className="rating-stars" style={{ justifyContent: 'center', fontSize: '13px' }}>
                            <span style={{ color: 'var(--rating-color)' }}>★</span>
                            <span style={{ fontWeight: 800, color: '#000' }}>{app.scoreText}</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>({installs})</span>
                        </div>
                    )}
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/app/${app.appId}`} className="card flex-row items-center justify-between gap-5" style={{ display: 'flex' }}>
            <div className="flex items-center gap-4" style={{ flex: 1, minWidth: 0 }}>
                <img
                    src={app.icon}
                    alt={app.title}
                    style={{ width: '64px', height: '64px', borderRadius: '18px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <h3 style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: '#000',
                            margin: 0
                        }}>
                            {app.title}
                        </h3>
                        <span className="badge" style={{ fontSize: '9px', padding: '2px 8px' }}>New</span>
                    </div>
                    <p style={{
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                        fontWeight: 500,
                        marginBottom: '4px'
                    }}>
                        {app.developer}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {app.scoreText && (
                            <div className="rating-stars" style={{ fontSize: '12px' }}>
                                <span style={{ color: 'var(--rating-color)' }}>★</span>
                                <span style={{ fontWeight: 800, color: '#000' }}>{app.scoreText}</span>
                            </div>
                        )}
                        <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{installs}</span>
                    </div>
                </div>
            </div>
            {showDownload && (
                <div className="btn-primary" style={{ padding: '8px 20px', fontSize: '13px', flexShrink: 0 }}>
                    Download
                </div>
            )}
        </Link>
    );
}
