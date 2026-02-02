"use client";

import React from "react";
import ThreeDSkull from "./ThreeDSkull";

const HeroSectionNew = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#020617] flex items-center justify-center border-t border-[#FFD700]/20">

      {/* --- BACKGROUND ELEMENTS --- */}

      {/* Star Field (Static & Twinkling) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[url('/images/stars.png')] opacity-40 animate-pulse" />
        {/* Fallback pattern if image missing */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)] opacity-80" />
      </div>

      {/* Grid Floor (Cyberpunk Vibe) */}
      <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_top,#00FF9E10_1px,transparent_1px),linear-gradient(to_right,#00FF9E10_1px,transparent_1px)] bg-[size:40px_40px] [perspective:1000px] [transform:rotateX(60deg)_translateY(200px)] opacity-20" />

      {/* --- OVERLAY UI (Techfest Style - Pixel Perfect) --- */}

      {/* 1. Left Sidebar (Navigation) - Full Height Glass & Robotic */}
      <div className="absolute left-0 top-0 h-full w-[90px] z-30 hidden md:flex flex-col items-center justify-center gap-8 bg-black/40 backdrop-blur-md border-r border-[#00FF9E]/20 clip-path-slant">
        {[
          { icon: "🏠", label: "HOME" },
          { icon: "📅", label: "EVENTS" },
          { icon: "📞", label: "CONTACT" },
          { icon: "👥", label: "TEAM" },
          { icon: "💎", label: "PATRONS" },
          { icon: "🛒", label: "STORE" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center group cursor-pointer w-full py-2 relative">
            {/* Robotic Active/Hover Indicator */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-full bg-[#00FF9E] transition-all duration-300 shadow-[0_0_10px_#00FF9E]" />

            <div className="w-12 h-12 bg-[#00FF9E]/5 border border-[#00FF9E]/30 flex items-center justify-center transform hover:scale-110 transition-all duration-300 [clip-path:polygon(20%_0%,80%_0%,100%_20%,100%_80%,80%_100%,20%_100%,0%_80%,0%_20%)] group-hover:bg-[#00FF9E] group-hover:text-black">
              <span className="text-2xl filter drop-shadow-[0_0_5px_rgba(0,255,158,0.8)]">{item.icon}</span>
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest mt-2 text-white/50 group-hover:text-[#00FF9E] transition-colors">{item.label}</span>
          </div>
        ))}
      </div>

      {/* 2. Right Sidebar (Socials) - Full Height Glass & Bigger */}
      <div className="absolute right-0 top-0 h-full w-[100px] z-30 hidden md:flex flex-col items-center justify-center gap-8 bg-black/40 backdrop-blur-md border-l border-[#00FF9E]/20">
        {["📸", "💼", "▶️", "✖️", "💬", "📱"].map((social, i) => (
          <div key={i} className="w-14 h-14 rounded-xl border border-white/10 flex items-center justify-center cursor-pointer hover:border-[#00FF9E] hover:bg-[#00FF9E]/10 transition-all duration-300 group hover:rotate-6 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <span className="text-white/60 group-hover:text-[#00FF9E] text-2xl filter drop-shadow-[0_0_5px_rgba(0,255,158,0.5)]">{social}</span>
          </div>
        ))}
      </div>

      {/* 3. Center Title Block (Floating at Top) */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 z-20 text-center flex flex-col items-center w-full pointer-events-none">
        <p className="text-[#00FF9E] text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Presents UIET's
        </p>
        {/* Custom Font Title */}
        <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 italic tracking-tighter filter drop-shadow-[0_0_20px_rgba(0,255,158,0.3)] animate-fade-in-up" style={{ fontFamily: "'Orbitron', sans-serif", animationDelay: "0.2s" }}>
          ROBO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">RUMBLE</span> <span className="text-[#00FF9E] not-italic">3.0</span>
        </h1>
        <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-[#00FF9E] to-transparent my-4" />
        <p className="text-white/60 text-[10px] md:text-xs font-mono tracking-[0.5em] uppercase animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          BY UIET KANPUR
        </p>
      </div>

      {/* --- MAIN CONTENT --- */}
      {/* Removed pt-20 to stretch to top */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

        {/* 3D WIREFRAME SKULL */}
        <div className="w-full h-full flex items-center justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <ThreeDSkull />
        </div>

      </div>

      {/* Style for animations explicitly defined here if needed, or rely on global/tailwind */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default HeroSectionNew;
