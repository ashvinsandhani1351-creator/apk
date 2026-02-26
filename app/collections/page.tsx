import Link from 'next/link';
import { getAllCollections } from '@/lib/collections';
import { Lightbulb, ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Discover App Collections - Bitcryptpress',
    description: 'Explore curated collections of Android apps designed to solve specific problems and improve your daily life.',
};

export default function CollectionsIndex() {
    const collections = getAllCollections();

    return (
        <div className="flex flex-col gap-10 max-w-5xl mx-auto py-10">
            <nav style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Home » Collections
            </nav>

            <section className="text-center md:text-left flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-gray-100">
                <div style={{ backgroundColor: '#f0f7ff', padding: '20px', borderRadius: '50%', color: 'var(--primary-color)' }}>
                    <Lightbulb size={40} />
                </div>
                <div>
                    <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '10px' }}>Curated App Collections</h1>
                    <p style={{ fontSize: '18px', color: 'var(--text-muted)' }}>
                        Handpicked lists to solve your problems, from productivity boosters to hidden gems you didn't know you needed.
                    </p>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {collections.map((col) => (
                    <Link
                        key={col.id}
                        href={`/collections/${col.id}`}
                        className="card hover-lift flex flex-col gap-4"
                        style={{ textDecoration: 'none', color: 'inherit', padding: '30px' }}
                    >
                        <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--primary-color)' }}>{col.title}</h2>
                        <p style={{ color: 'var(--text-main)', lineHeight: '1.6', flex: 1 }}>{col.description}</p>

                        <div className="flex items-center justify-between mt-4 text-sm" style={{ color: 'var(--text-muted)', fontWeight: 600 }}>
                            <span>{col.package_ids?.length || 0} Apps inside</span>
                            <span className="flex items-center gap-1 text-primary">Explore <ArrowRight size={16} /></span>
                        </div>
                    </Link>
                ))}

                {collections.length === 0 && (
                    <div className="col-span-2 text-center py-20 text-gray-400">
                        No collections available yet.
                    </div>
                )}
            </section>
        </div>
    );
}
