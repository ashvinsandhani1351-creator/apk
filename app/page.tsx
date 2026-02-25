import AppCard from '@/components/AppCard';
import { getApps, getAppDetails } from '@/lib/scraper';
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
            <div className="btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>Explore Top Apps</div>
            <div style={{ padding: '14px 32px', fontSize: '16px', fontWeight: 600, border: '2px solid #000', borderRadius: '24px', cursor: 'pointer' }}>Gaming Zone</div>
          </div>
        </div>
      </section>

      {/* Category Chips Section */}
      <section style={{ marginBottom: '-20px' }}>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide" style={{ paddingBottom: '10px' }}>
          {['All Categories', 'Social', 'Tools', 'Communication', 'Entertainment', 'Games', 'Productivity', 'Lifestyle'].map((cat, i) => (
            <div key={cat} className={`chip ${i === 0 ? 'active' : ''}`}>
              {cat}
            </div>
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

      {/* Editor's Choice Section */}
      <section>
        <div className="section-title">
          <h2>Editor’s Choice</h2>
          <a href="/categories" style={{ color: 'var(--primary-color)', fontSize: '15px', fontWeight: 700 }}>Browse More →</a>
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
