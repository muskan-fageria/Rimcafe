import React from "react";

export default function FiligreeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center w-full my-12 ${className}`}>
      {/* Left horizontal gradient line */}
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c59b27]/40 to-transparent" />
      
      {/* Intricate Architectural Filigree SVG */}
      <svg 
        className="w-32 h-10 text-[#d4af37]/75 mx-6 transition-all duration-300 hover:text-[#faf6f0]" 
        viewBox="0 0 120 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Scrollwork */}
        <path 
          d="M 15 25 C 15 15, 32 10, 42 22 C 52 34, 42 40, 37 34 C 32 28, 38 16, 50 16 C 56 16, 60 22, 60 27" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
        />
        {/* Right Scrollwork (Symmetrical) */}
        <path 
          d="M 105 25 C 105 15, 88 10, 78 22 C 68 34, 78 40, 83 34 C 88 28, 82 16, 70 16 C 64 16, 60 22, 60 27" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
        />
        {/* Center Architectural Crest */}
        <path 
          d="M 60 8 Q 54 20 60 32 Q 66 20 60 8 Z" 
          fill="currentColor" 
        />
        {/* Tiny Filigree Accent Points */}
        <circle cx="60" cy="4" r="2.5" fill="currentColor" />
        <circle cx="45" cy="18" r="1.5" fill="currentColor" />
        <circle cx="75" cy="18" r="1.5" fill="currentColor" />
        <path 
          d="M 54 28 Q 60 25 66 28" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
        />
      </svg>
      
      {/* Right horizontal gradient line */}
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c59b27]/40 to-transparent" />
    </div>
  );
}
