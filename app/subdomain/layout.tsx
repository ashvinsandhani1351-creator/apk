import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Download App - Bitcryptpress",
    description: "Download the latest app version.",
};

export default function SubdomainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="subdomain-layout">
            {children}
        </div>
    );
}
