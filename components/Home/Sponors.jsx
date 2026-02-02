"use client"
import React from 'react';

const sponsorsList = [
  { name: "Domino's", logo: "/images/dominos.png" },
  { name: "Red Bull", logo: "/images/redbull2.png" },
  { name: "Sahara", logo: "/images/sahara.jpg" },
  { name: "Nkosh", logo: "/images/Nkosh.png" },
  { name: "CSJMIF", logo: "/images/CSJMIF.jpg" },
  { name: "Daily Wash", logo: "/images/dailywash.jpg" },
];

const sponsors = [...sponsorsList, ...sponsorsList];

const Sponsors = () => {
  return (
    <section className="relative bg-[#020410] py-24 px-4 overflow-hidden font-orbitron">

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(#00ff9f 1px, transparent 1px), linear-gradient(90deg, #00ff9f 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center mb-16">

        {/* --- Top Neon Line --- */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="h-[3px] w-full max-w-[400px] bg-gradient-to-r from-transparent via-[#2fbf2f] to-transparent mt-1 opacity-50"></div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-wider mb-4 drop-shadow-[0_0_5px_rgba(0,255,159,0.5)]">
          Previous Sponsors
        </h2>

        <p className="text-slate-400 text-sm md:text-base tracking-[0.4em] uppercase">
          Trusted by industry leaders
        </p>
      </div>

      {/* MARQUEE CONTAINER */}
      <div className="relative w-full overflow-hidden">

        {/* Fade Effect */}
        <div className="absolute top-0 left-0 z-20 h-full w-32 bg-gradient-to-r from-[#020410] to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 z-20 h-full w-32 bg-gradient-to-l from-[#020410] to-transparent pointer-events-none"></div>

        <div className="flex w-max animate-marquee hover:pause">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="mx-6 group relative flex items-center justify-center w-64 h-32 bg-[#0a0f1c] border border-slate-800 rounded-xl hover:border-slate-600 hover:bg-slate-800 transition-all duration-300 cursor-pointer"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-16 w-auto object-contain z-10 filter drop-shadow-md transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;