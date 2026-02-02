"use client"
import React from 'react';

const CircuitPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M20 20 L50 20 L50 50 M70 70 L90 70 L90 90" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="2" fill="#22d3ee" />
      <path d="M10 80 L30 80 L60 50" fill="none" stroke="#22d3ee" strokeWidth="1" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#circuit)" />
  </svg>
);

// Yahan 'children' prop accept kar rahe hain (Jo ki apka Form hoga)
const SciFiCard = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden relative font-sans">

      {/* 1. Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] z-0"></div>

      {/* 2. Circuit Pattern */}
      <CircuitPattern />

      {/* 3. Main Content Wrapper (Form yahan aayega) */}
      <div className="relative z-10 w-full h-full flex justify-center items-center">
        {children}
      </div>

    </div>
  );
};

export default SciFiCard;