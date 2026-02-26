import Link from 'next/link';
import AppCard from '@/components/AppCard';
import { getApps, getAppDetails, getDiscoverApps } from '@/lib/scraper';
import { getLatestNews, NewsItem } from '@/lib/news';
import { getPinnedIds } from '@/lib/pins';

async function getPinnedApps() {
  const pins = getPinnedIds();
  const apps = await Promise.all(pins.map(async (id: string) => {
    return await getAppDetails(id);
  }));
  return apps.filter(app => app !== null);
}

export default async function Home() {
  const [featuredApps, editorsChoice, recentlyUpdated, topGames, discoverApps, allNews] = await Promise.all([
    getPinnedApps(),
    getApps('TOP_FREE', undefined, 10),
    getApps('NEW_FREE', undefined, 12),
    getApps('TOP_FREE_GAMES', undefined, 12),
    getDiscoverApps(12),
    getLatestNews().catch(() => [] as NewsItem[])
  ]);

  const latestNews = allNews.slice(0, 3);

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

      {/* Latest Tech News Section */}
      <section>
        <div className="section-title" style={{ borderLeftColor: '#ff9800' }}>
          <h2>Latest Tech News</h2>
          <Link href="/news" style={{ fontSize: '14px', color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>View All →</Link>
        </div>
        {latestNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((item) => (
              <Link key={item.id} href={`/news/${item.id}`} className="card hover-lift flex flex-col overflow-hidden" style={{ textDecoration: 'none', color: 'inherit', padding: 0 }}>
                {item.imageUrl && (
                  <div style={{ position: 'relative', width: '100%', height: '160px', backgroundColor: '#f0f0f0' }}>
                    <img src={item.imageUrl} alt={item.title} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                )}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>{item.source} • {new Date(item.pubDate).toLocaleDateString()}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', lineHeight: '1.4' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-main)', fontSize: '13px', lineHeight: '1.5', flex: 1 }}>{item.description.substring(0, 80)}...</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card text-center py-10" style={{ backgroundColor: '#fff8e1', border: '1px solid #ffe082' }}>
            <p style={{ color: '#f57c00', fontWeight: 600 }}>Refreshing latest headlines...</p>
            <p className="text-muted mt-2 text-sm">Our news bots are checking for updates. Click 'View All' to see the full archive.</p>
          </div>
        )}
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
