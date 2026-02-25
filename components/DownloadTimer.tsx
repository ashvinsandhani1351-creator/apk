'use client';

import { useState, useEffect } from 'react';
import { Download, ShieldCheck, Zap, Globe, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface DownloadTimerProps {
    appId: string;
    appName: string;
    appIcon: string;
}

export default function DownloadTimer({ appId, appName, appIcon }: DownloadTimerProps) {
    const [timeLeft, setTimeLeft] = useState(5);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsReady(true);
        }
    }, [timeLeft]);

    const mirrors = [
        {
            name: 'APKCombo (Fastest)',
            icon: <Zap size={18} />,
            url: `https://apkcombo.com/apk-downloader/#package=${appId}`,
            color: '#4caf50'
        },
        {
            name: 'APKPure (Official Mirror)',
            icon: <ShieldCheck size={18} />,
            url: `https://apkpure.com/search?q=${appId}`,
            color: '#2196f3'
        },
        {
            name: 'Google Play Store',
            icon: <Globe size={18} />,
            url: `https://play.google.com/store/apps/details?id=${appId}`,
            color: '#f44336'
        }
    ];

    return (
        <div className="flex flex-col items-center gap-8 py-10 max-w-2xl mx-auto">
            <Link href={`/app/${appId}`} className="self-start flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                <ArrowLeft size={16} /> Back to details
            </Link>

            <div className="card w-full text-center flex flex-col items-center gap-6 p-10">
                <img
                    src={appIcon}
                    alt={appName}
                    style={{ width: '100px', height: '100px', borderRadius: '22px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
                />

                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Downloading {appName}</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Version: Latest | Safe & Secure APK</p>
                </div>

                {!isReady ? (
                    <div className="flex flex-col items-center gap-4 py-4">
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="absolute w-full h-full" viewBox="0 0 36 36">
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#eee"
                                    strokeWidth="3"
                                />
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="var(--primary-color)"
                                    strokeWidth="3"
                                    strokeDasharray={`${(5 - timeLeft) * 20}, 100`}
                                    style={{ transition: 'stroke-dasharray 1s linear' }}
                                />
                            </svg>
                            <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary-color)' }}>{timeLeft}</span>
                        </div>
                        <p style={{ fontWeight: 500, color: 'var(--text-main)' }}>Preparing your download links...</p>
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <ShieldCheck size={18} /> Verified Safe by Bitcryptpress Scan
                        </div>

                        <p style={{ textAlign: 'left', fontWeight: 700, fontSize: '16px', marginTop: '10px' }}>Choose a Mirror to Start Download:</p>

                        <div className="flex flex-col gap-3">
                            {mirrors.map((mirror, index) => (
                                <a
                                    key={index}
                                    href={mirror.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="card hover-lift flex items-center justify-between p-4"
                                    style={{ border: `1px solid ${mirror.color}20`, textDecoration: 'none' }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div style={{ color: mirror.color }}>{mirror.icon}</div>
                                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{mirror.name}</span>
                                    </div>
                                    <ExternalLink size={16} style={{ color: 'var(--text-muted)' }} />
                                </a>
                            ))}
                        </div>

                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '15px' }}>
                            If the download doesn't start, try another mirror.
                        </p>
                    </div>
                )}
            </div>

            <div className="card w-full">
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '15px' }}>How to install APK?</h3>
                <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: '1.6' }}>
                    <li>Download the APK file from one of the mirrors above.</li>
                    <li>Open your device <strong>Settings</strong> and enable <strong>"Unknown Sources"</strong>.</li>
                    <li>Locate the downloaded file in your <strong>Downloads</strong> folder.</li>
                    <li>Tap on the file and follow the installation prompts.</li>
                </ol>
            </div>
        </div>
    );
}
