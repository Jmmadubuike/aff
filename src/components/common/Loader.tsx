// src/components/common/Loader.tsx
"use client";

export const Loader = ({ loading }: { loading: boolean }) => (
  loading ? (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500 border-solid relative flex items-center justify-center">
        <span className="absolute inset-0 flex items-center justify-center text-yellow-500 font-bold text-xs">Spray n Sniff</span>
      </div>
      <span className="mt-4 text-xl text-white tracking-wide">Loading...</span>
    </div>
  ) : null
);
