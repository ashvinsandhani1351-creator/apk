'use client';

import { useState, useEffect } from 'react';
import { Search, Pin, Trash2, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [pins, setPins] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/admin/pins').then(res => res.json()).then(setPins);
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch(`/api/apps?q=${query}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
        setLoading(false);
    };

    const togglePin = async (appId: string, isPinned: boolean) => {
        const action = isPinned ? 'remove' : 'add';
        const res = await fetch('/api/admin/pins', {
            method: 'POST',
            body: JSON.stringify({ appId, action }),
            headers: { 'Content-Type': 'application/json' }
        });
        const newPins = await res.json();
        setPins(newPins);
        setSuccess(`Successfully ${action === 'add' ? 'pinned' : 'unpinned'} ${appId}`);
        setTimeout(() => setSuccess(null), 3000);
    };

    return (
        <div className="flex flex-col gap-8">
            <h1 style={{ fontSize: '32px', fontWeight: 700 }}>Admin Dashboard</h1>

            {success && (
                <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '15px', borderRadius: '8px', display: 'flex', itemsCenter: 'center', gap: '10px' }}>
                    <CheckCircle size={20} /> {success}
                </div>
            )}

            <div className="card">
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Pin New App</h2>
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name or package ID..."
                        style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                    />
                    <button type="submit" className="btn-primary" disabled={loading}>
                        <Search size={20} /> {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>

                {results.length > 0 && (
                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {results.map(app => {
                            const isPinned = pins.includes(app.appId);
                            return (
                                <div key={app.appId} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <img src={app.icon} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
                                        <div>
                                            <div style={{ fontWeight: 600 }}>{app.title}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{app.appId}</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => togglePin(app.appId, isPinned)}
                                        style={{
                                            color: isPinned ? '#d32f2f' : 'var(--primary-color)',
                                            fontWeight: 500,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px'
                                        }}
                                    >
                                        {isPinned ? <Trash2 size={18} /> : <Pin size={18} />}
                                        {isPinned ? 'Unpin' : 'Pin to Home'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="card">
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Currently Pinned Apps</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {pins.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)' }}>No apps pinned yet.</p>
                    ) : (
                        pins.map(id => (
                            <div key={id} className="flex items-center justify-between p-3 border rounded-lg">
                                <span style={{ fontWeight: 500 }}>{id}</span>
                                <button onClick={() => togglePin(id, true)} style={{ color: '#d32f2f' }}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
