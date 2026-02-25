import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Techylist - The Hub Of Latest Apps & Games",
  description: "Techylist is a portal on which you can find APK files of the latest apps & games. We ensure that all the files shared here are safe & secure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main className="main-content">
          <div className="container">
            {children}
          </div>
        </main>

        <footer style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '60px 0 20px' }}>
          <div className="container">
            <div className="flex justify-between" style={{ marginBottom: '40px' }}>
              <div style={{ maxWidth: '300px' }}>
                <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>TECHYLIST</h2>
                <p style={{ opacity: 0.9 }}>
                  Techylist is a portal on which you can find APK files of the latest apps & games. We ensure that all the files shared here are safe & secure.
                </p>
              </div>
              <div className="flex gap-4">
                <div>
                  <h4 style={{ marginBottom: '15px' }}>PAGES</h4>
                  <ul style={{ opacity: 0.8, fontSize: '14px' }}>
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Privacy Policy</li>
                  </ul>
                </div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px', textAlign: 'center', fontSize: '14px' }}>
              <p>Copyright © 2026 · Techylist</p>
              <p style={{ marginTop: '5px', opacity: 0.7 }}>All the Logos, Trademarks and Images belong to their Respective Owners.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
