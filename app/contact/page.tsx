export default function ContactPage() {
    return (
        <div className="flex flex-col gap-8 max-w-3xl mx-auto py-10">
            <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--primary-color)', textAlign: 'center' }}>Contact Us</h1>

            <section className="card p-10 text-center">
                <p style={{ fontSize: '18px', color: 'var(--text-main)', marginBottom: '30px' }}>
                    Have a question, feedback, or need help with Bitcryptpress? We'd love to hear from you!
                    Our team is dedicated to providing the best experience possible.
                </p>

                <div className="flex flex-col gap-6 items-center">
                    <div style={{ padding: '20px', backgroundColor: '#f0f7ff', borderRadius: '12px', width: '100%' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '5px' }}>Email Support</h3>
                        <p style={{ fontSize: '20px', color: 'var(--primary-color)', fontWeight: 600 }}>support@bitcryptpress.online</p>
                    </div>

                    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px', width: '100%' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '5px' }}>Business Inquiries</h3>
                        <p style={{ fontSize: '16px', color: 'var(--text-muted)' }}>For partnerships, advertising, or DMCA requests, please reach out via email.</p>
                    </div>
                </div>

                <div style={{ marginTop: '40px', fontSize: '15px', color: 'var(--text-muted)' }}>
                    <p>We typically respond within 24-48 hours during business days.</p>
                </div>
            </section>
        </div>
    );
}
