export default function PrivacyPage() {
    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto py-10">
            <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--primary-color)' }}>Privacy Policy</h1>

            <section className="card" style={{ lineHeight: '1.8' }}>
                <p>Last Updated: February 26, 2026</p>

                <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '25px 0 15px' }}>1. Introduction</h2>
                <p>
                    At Bitcryptpress, we respect your privacy and are committed to protecting your personal data.
                    This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
                </p>

                <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '25px 0 15px' }}>2. Data Collection</h2>
                <p>
                    We do not require you to create an account or provide personal identification to browse Bitcryptpress.
                    However, we may collect non-personal information such as:
                </p>
                <ul style={{ paddingLeft: '20px' }}>
                    <li>IP Addresses (for security and analytical purposes)</li>
                    <li>Browser type and version</li>
                    <li>Page views and navigation patterns</li>
                </ul>

                <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '25px 0 15px' }}>3. How We Use Information</h2>
                <p>
                    The information we collect is used to improve our website's performance, enhance user experience,
                    and maintain the security of our platform. We do not sell or rent your information to third parties.
                </p>

                <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '25px 0 15px' }}>4. Cookies</h2>
                <p>
                    Bitcryptpress uses cookies to store user preferences and optimize our services.
                    You can choose to disable cookies through your browser settings, though some features may not function correctly.
                </p>

                <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '25px 0 15px' }}>5. Third-Party Links</h2>
                <p>
                    Our site contains links to external websites (e.g., Google Play Store, APK mirrors).
                    We are not responsible for the privacy practices or content of these third-party sites.
                </p>

                <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '25px 0 15px' }}>6. Changes to This Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
            </section>
        </div>
    );
}
