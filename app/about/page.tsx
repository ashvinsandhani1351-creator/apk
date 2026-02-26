export default function AboutPage() {
    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto py-10">
            <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--primary-color)' }}>About Bitcryptpress</h1>

            <section className="card">
                <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--text-main)' }}>
                    Welcome to <strong>Bitcryptpress</strong>, your premier destination for discovering and downloading the latest Android applications and games.
                    Our mission is to provide a safe, fast, and reliable platform for users to access high-quality APK files directly sourced from the official stores.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                    <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '15px' }}>Our Vision</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
                        We believe in an open and accessible mobile ecosystem. Bitcryptpress aims to be the bridge between developers and users,
                        making it easier than ever to find the tools and entertainment you need.
                    </p>
                </div>
                <div className="card">
                    <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '15px' }}>Safety First</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
                        Security is our top priority. Every app listed on Bitcryptpress undergoes a rigorous verification process to ensure
                        it's free from malware and safe for your device.
                    </p>
                </div>
            </section>

            <section className="card">
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Why Choose Us?</h2>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingLeft: '20px' }}>
                    <li><strong>Real-time Updates:</strong> We sync directly with the Play Store to bring you the newest versions instantly.</li>
                    <li><strong>Expert Insights:</strong> Our human-written reviews provide you with honest pros and cons for every app.</li>
                    <li><strong>Fast Downloads:</strong> With multiple mirrors, we ensure you always have a high-speed connection.</li>
                    <li><strong>Clean Experience:</strong> We focus on content, not intrusive ads or clutter.</li>
                </ul>
            </section>
        </div>
    );
}
