import Link from 'next/link';
import { LayoutGrid, Gamepad2, Heart, Music, Camera, ShoppingBag, MessageCircle, Globe } from 'lucide-react';

const categories = [
    { name: 'Communication', id: 'COMMUNICATION', icon: <MessageCircle /> },
    { name: 'Social', id: 'SOCIAL', icon: <Globe /> },
    { name: 'Entertainment', id: 'ENTERTAINMENT', icon: <Camera /> },
    { name: 'Music & Audio', id: 'MUSIC_AND_AUDIO', icon: <Music /> },
    { name: 'Shopping', id: 'SHOPPING', icon: <ShoppingBag /> },
    { name: 'Health & Fitness', id: 'HEALTH_AND_FITNESS', icon: <Heart /> },
    { name: 'Tools', id: 'TOOLS', icon: <LayoutGrid /> },
    { name: 'Action Games', id: 'GAME_ACTION', icon: <Gamepad2 /> },
];

export default function CategoriesPage() {
    return (
        <div className="flex flex-col gap-8">
            <nav style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Home » Categories
            </nav>

            <section>
                <div className="flex justify-between items-center" style={{ marginBottom: '30px', borderLeft: '4px solid var(--primary-color)', paddingLeft: '15px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Browse by Category</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/categories/${cat.id.toLowerCase()}`}
                            className="card flex flex-col items-center gap-3 py-8 hover:transform hover:translate-y-[-5px] transition-all"
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ color: 'var(--primary-color)', transform: 'scale(1.5)', marginBottom: '10px' }}>
                                {cat.icon}
                            </div>
                            <span style={{ fontWeight: 600 }}>{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
