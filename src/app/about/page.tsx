"use client";

import React from "react";

const AboutUs = () => {
    return (
        <section className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center">
            {/* Heading */}
            <h1 className="text-5xl font-bold text-center mb-6 text-white tracking-tight">
                About Spray n Sniff
            </h1>
            <p className="text-center text-gray-400 max-w-3xl mb-12 text-lg">
                Spray n Sniff is your premier destination for luxury perfumes delivered
                straight to your doorstep. We combine elegance, quality, and convenience
                to ensure every scent tells a story and every experience feels exclusive.
            </p>

            {/* Mission & Vision Cards */}
            <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full">
                {/* Mission */}
                <div className="flex-1 bg-[#111] border border-white rounded-2xl p-8 shadow-[0_0_25px_rgba(255,215,0,0.1)]">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Our Mission</h2>
                    <p className="text-gray-300 text-base">
                        To redefine the perfume shopping experience by delivering luxury scents
                        with speed, reliability, and unmatched customer service, making premium
                        fragrances accessible to everyone.
                    </p>
                </div>

                {/* Vision */}
                <div className="flex-1 bg-[#111] border border-white rounded-2xl p-8 shadow-[0_0_25px_rgba(255,215,0,0.1)]">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Our Vision</h2>
                    <p className="text-gray-300 text-base">
                        To become the most trusted online luxury perfume brand, inspiring a world
                        where elegance and sophistication are just a click away.
                    </p>
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
                <p className="text-gray-400 mb-4 text-lg">
                    Discover the art of scent and elevate your fragrance experience.
                </p>
                <a
                    href="/products"
                    className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-lg shadow-[0_0_12px_rgba(255,215,0,0.3)] hover:bg-yellow-400 transition-all duration-300"
                >
                    Shop Now
                </a>
            </div>
        </section>
    );
};

export default AboutUs;
