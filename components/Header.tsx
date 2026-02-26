'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container flex items-center justify-between">
                <Link href="/" className="logo">
                    BITCRYPTPRESS
                </Link>
                <nav className="main-nav">
                    <ul className="flex gap-2">
                        <li>
                            <Link href="/apps" className={`nav-link ${pathname === '/apps' ? 'active' : ''}`}>
                                Apps
                            </Link>
                        </li>
                        <li>
                            <Link href="/games" className={`nav-link ${pathname === '/games' ? 'active' : ''}`}>
                                Games
                            </Link>
                        </li>
                        <li>
                            <Link href="/categories" className={`nav-link ${pathname === '/categories' ? 'active' : ''}`}>
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link href="/news" className={`nav-link ${pathname === '/news' ? 'active' : ''}`}>
                                News
                            </Link>
                        </li>
                        <li>
                            <Link href="/collections" className={`nav-link ${pathname === '/collections' ? 'active' : ''}`}>
                                Collections
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="header-actions">
                    <form action="/search" method="GET" className="search-form">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            name="q"
                            placeholder="Search for amazing apps & games..."
                            className="search-input"
                        />
                    </form>
                    <div className="join-btn">
                        Join Us
                    </div>
                </div>
            </div>
        </header>
    );
}
