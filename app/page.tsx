import Link from 'next/link';
import AppCard from '@/components/AppCard';
import { getApps, getAppDetails, getDiscoverApps } from '@/lib/scraper';
import { getPinnedIds } from '@/lib/pins';

async function getPinnedApps() {
  const pins = getPinnedIds();
  const apps = await Promise.all(pins.map(async (id: string) => {
    return await getAppDetails(id);
  }));
  return apps.filter(app => app !== null);
}

export default async function Home() {
  const featuredApps = await getPinnedApps();
  const editorsChoice = await getApps('TOP_FREE', undefined, 10);
  const recentlyUpdated = await getApps('NEW_FREE', undefined, 12);
  const topGames = await getApps('TOP_FREE_GAMES', undefined, 12);
  const discoverApps = await getDiscoverApps(12);

  const categories = [
    { name: 'Social', id: 'SOCIAL' },
    { name: 'Tools', id: 'TOOLS' },
    { name: 'Communication', id: 'COMMUNICATION' },
    { name: 'Entertainment', id: 'ENTERTAINMENT' },
    { name: 'Games', id: 'GAME' },
    { name: 'Productivity', id: 'PRODUCTIVITY' },
    { name: 'Lifestyle', id: 'LIFESTYLE' },
  ];

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="hero">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>The Ultimate Hub for <br /><span style={{ color: 'var(--primary-color)' }}>Apps & Games</span></h1>
          <p>
            Discover, explore, and download the world's most popular Android applications.
            Safe, secure, and always updated with the latest versions.
          </p>
          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/apps" className="btn-primary" style={{ padding: '14px 32px', fontSize: '16px', textDecoration: 'none' }}>Explore Top Apps</Link>
            <Link href="/games" style={{ padding: '14px 32px', fontSize: '16px', fontWeight: 600, border: '2px solid #000', borderRadius: '24px', cursor: 'pointer', textDecoration: 'none', color: '#000' }}>Gaming Zone</Link>
          </div>
        </div>
      </section>

      {/* Category Chips Section */}
      <section style={{ marginBottom: '-20px' }}>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide" style={{ paddingBottom: '10px' }}>
          <Link href="/categories" className="chip active" style={{ textDecoration: 'none' }}>
            All Categories
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.id.toLowerCase()}`}
              className="chip"
              style={{ textDecoration: 'none' }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Section (Pinned) */}
      {featuredApps.length > 0 && (
        <section>
          <div className="section-title" style={{ borderLeftColor: '#ff9800' }}>
            <h2>Featured Spotlights</h2>
          </div>
          <div className="responsive-grid">
            {featuredApps.map((app: any) => (
              <AppCard key={app.appId} app={app} showDownload />
            ))}
          </div>
        </section>
      )}

      {/* Discover Section (Randomized) */}
      <section>
        <div className="section-title" style={{ borderLeftColor: '#4caf50' }}>
          <h2>Discover Something New</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 400 }}>Randomly picked for you today</p>
        </div>
        <div className="responsive-grid">
          {discoverApps.map((app: any) => (
            <AppCard key={app.appId} app={app} variant="vertical" />
          ))}
        </div>
      </section>

      {/* Editor's Choice Section */}
      <section>
        <div className="section-title">
          <h2>Editor’s Choice</h2>
          <Link href="/categories" style={{ color: 'var(--primary-color)', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>Browse More →</Link>
        </div>
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '24px', scrollbarWidth: 'none', paddingLeft: '4px' }} className="scrollbar-hide">
            {editorsChoice.map((app: any) => (
              <div key={app.appId} style={{ minWidth: '220px', flexShrink: 0 }}>
                <AppCard app={app} variant="vertical" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Comparisons Section */}
      <section>
        <div className="section-title" style={{ borderLeftColor: '#e91e63' }}>
          <h2>Trending Comparisons</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 400 }}>Which app is right for you?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/compare/com.whatsapp-vs-org.telegram.messenger" className="card hover-lift flex flex-col justify-center items-center gap-2 p-6" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="flex items-center gap-4">
              <span style={{ fontSize: '18px', fontWeight: 700 }}>WhatsApp</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>VS</span>
              <span style={{ fontSize: '18px', fontWeight: 700 }}>Telegram</span>
            </div>
            <span className="text-primary text-sm font-semibold mt-2">Compare Now →</span>
          </Link>

          <Link href="/compare/com.instagram.android-vs-com.zhiliaoapp.musically" className="card hover-lift flex flex-col justify-center items-center gap-2 p-6" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="flex items-center gap-4">
              <span style={{ fontSize: '18px', fontWeight: 700 }}>Instagram</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>VS</span>
              <span style={{ fontSize: '18px', fontWeight: 700 }}>TikTok</span>
            </div>
            <span className="text-primary text-sm font-semibold mt-2">Compare Now →</span>
          </Link>

          <Link href="/compare/com.spotify.music-vs-com.apple.android.music" className="card hover-lift flex flex-col justify-center items-center gap-2 p-6" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="flex items-center gap-4">
              <span style={{ fontSize: '18px', fontWeight: 700 }}>Spotify</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>VS</span>
              <span style={{ fontSize: '18px', fontWeight: 700 }}>Apple Music</span>
            </div>
            <span className="text-primary text-sm font-semibold mt-2">Compare Now →</span>
          </Link>
        </div>
      </section>

      {/* Grid Sections */}
      <section>
        <div className="section-title">
          <h2>Recently Updated</h2>
        </div>
        <div className="responsive-grid">
          {recentlyUpdated.slice(0, 9).map((app: any) => (
            <AppCard key={app.appId} app={app} variant="vertical" />
          ))}
        </div>
      </section>

      {/* Games Section */}
      <section>
        <div className="section-title">
          <h2>Trending Games</h2>
        </div>
        <div className="responsive-grid">
          {topGames.slice(0, 9).map((app: any) => (
            <AppCard key={app.appId} app={app} variant="vertical" />
          ))}
        </div>
      </section>
    </div>
  );
}
