"use client";

import Link from "next/link";

const ComingSoon = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      {/* Rotating Logo / Loader */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="h-28 w-28 border-t-4 border-white border-solid rounded-full animate-slow-spin flex items-center justify-center">
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm md:text-base text-center">
            Spray n Sniff
          </span>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white drop-shadow-lg text-center">
        Coming Soon
      </h1>

      {/* Subheading */}
      <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-md text-center">
        This feature is under development. We’re crafting something special for you.
        Stay tuned and check back soon!
      </p>

      {/* CTA Button */}
      <Link
        href="/"
        className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-400 transition-all duration-300"
      >
        Go Back Home
      </Link>

      {/* Custom Tailwind animation */}
      <style jsx>{`
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 4s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ComingSoon;
