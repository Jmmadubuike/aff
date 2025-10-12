"use client";

import Image from "next/image";

export default function VendorTicket() {
    const gold = "#CDA23B";

    return (
        <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: gold }}>
                Vendor Stand Confirmation 🛍️
            </h1>

            <p className="text-gray-400 max-w-xl mb-8">
                Thank you for joining <span className="font-semibold">Afro Fashion Fest 2025</span>
                as a Vendor. Below is your official vendor stand access confirmation.
            </p>

            <div className="relative w-80 h-90 border-2 border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                    src="/images/vendor-stand.jpg" // Replace with your vendor stand image
                    alt="Vendor Stand"
                    fill
                    className="object-cover"
                />
            </div>

            <p className="mt-8 text-gray-500 text-sm">
                Setup details and booth number will be sent to your email.
            </p>
        </section>
    );
}
