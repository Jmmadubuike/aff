export default function ThankYouPage() {
    const gold = "#CDA23B";

    return (
        <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: gold }}>
                Thank You!
            </h1>

            <p className="text-gray-400 max-w-lg">
                Your registration has been received.
                Our team will contact you soon with next steps.
            </p>
        </section>
    );
}
