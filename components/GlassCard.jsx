"use client"
import React, { useState, useEffect } from 'react';

// --- DATA: IMAGE ARRAYS ---
const eventImages = [
  "/gallery/photo1.jpeg",
  "/gallery/photo4.jpeg",
  "/gallery/photo8.jpeg",
  "/gallery/photo3.jpeg",
  "/gallery/photo2.jpeg",
  "/gallery/photo5.jpeg",
  "/gallery/photo6.jpeg",
  "/gallery/photo7.jpeg",
];

const teamImages = [
  "/gallery/photo10.jpeg",
  "/gallery/photo13.jpeg",
  "/gallery/photo15.jpeg",
  "/gallery/photo11.jpeg",
  "/gallery/photo12.jpeg",
  "/gallery/photo14.jpeg",
  "/gallery/photo16.jpeg",
];

const GlassCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openGallery = (type) => {
    if (type === 'events') {
      setCurrentImages(eventImages);
    } else {
      setCurrentImages(teamImages);
    }
    setCurrentIndex(0);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div className="w-full min-h-screen flex flex-col items-center overflow-y-auto overflow-x-hidden pb-20" suppressHydrationWarning={true}>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>

      {/* --- LIGHTBOX --- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeGallery}
        >

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-10 text-white/70 hover:text-[#ccff00] p-4 rounded-full bg-white/5 hover:bg-white/10 transition-all z-[10000] hidden md:block border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          {/* === Main Image Container === */}
          {/* Button ab iske andar hai, isliye 'relative' class zaroori hai */}
          <div
            className="relative max-w-6xl max-h-[90vh] p-1 mx-4 z-[9999]"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 z-[10010] bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200 transition-all cursor-pointer hover:scale-110"
              title="Close Gallery"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <img
              src={currentImages[currentIndex]}
              alt="Gallery Preview"
              className="max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl border border-white/10 bg-[#020617]"
            />
            {/* Counter */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white/90 font-mono bg-black/50 px-4 py-1 rounded-full border border-white/10">
              {currentIndex + 1} / {currentImages.length}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 md:right-10 text-white/70 hover:text-[#ccff00] p-4 rounded-full bg-white/5 hover:bg-white/10 transition-all z-[10000] hidden md:block border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      )}


      {/* SECTION 1: HERO */}
      <div className="w-full h-screen flex items-center justify-center shrink-0 hover:ease-out transition-all">
        <div className="z-10 animate-float">
          <div className="relative px-12 py-16 md:px-24 md:py-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center max-w-4xl mx-4" suppressHydrationWarning={true}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <h2 className="text-xl md:text-3xl text-gray-200 font-light mb-4 tracking-wide font-sans">
              Take a look at the glimpses of
            </h2>
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-wider mb-8 drop-shadow-xl font-sans">
              Robo Rumble <span className="text-[#ff5722]">2025</span>
            </h1>
            <div className="mt-2 animate-bounce cursor-pointer hover:text-gray-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>


      {/* SECTION 2: EVENTS CARD */}
      <div className="w-full max-w-6xl px-4 mb-20 z-10">
        <div className="flex flex-col md:flex-row bg-[#020617]/80 backdrop-blur-xl border border-[#0bb43e] shadow-[0_0_15px_rgba(11,180,62,0.3)] rounded-3xl overflow-hidden min-h-[400px] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(11,180,62,0.6)]" suppressHydrationWarning={true}>

          <div className="w-full md:w-1/2 p-4 grid grid-cols-2 gap-2">
            <div className="col-span-2 h-48 md:h-60 bg-gray-800 rounded-xl overflow-hidden">
              <img src={eventImages[0]} alt="Event Group" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="h-40 bg-gray-800 rounded-xl overflow-hidden">
              <img src={eventImages[1]} alt="Event Activity" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="h-40 bg-gray-800 rounded-xl overflow-hidden">
              <img src={eventImages[2]} alt="Event Robot" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 font-sans tracking-wide">
              Events
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Exciting competitions and opportunities to showcase your talent.
              Witness the clash of metal and code as robots battle for supremacy.
            </p>
            <button
              onClick={() => openGallery('events')}
              className="w-fit px-8 py-3 rounded-full border border-purple-500 text-white font-semibold tracking-wider hover:bg-purple-500/20 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.5)] active:scale-95"
            >
              VIEW MORE
            </button>
          </div>
        </div>
      </div>


      {/* SECTION 3: TEAM CARD */}
      <div className="w-full max-w-6xl px-4 mb-32 z-10">
        <div className="flex flex-col md:flex-row-reverse bg-[#020617]/80 backdrop-blur-xl border border-[#0bb43e] shadow-[0_0_15px_rgba(11,180,62,0.3)] rounded-3xl overflow-hidden min-h-[400px] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(11,180,62,0.6)]" suppressHydrationWarning={true}>

          <div className="w-full md:w-1/2 p-4 grid grid-cols-2 gap-2">
            <div className="h-40 bg-gray-800 rounded-xl overflow-hidden">
              <img src={teamImages[0]} alt="Team Work" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="h-40 bg-gray-800 rounded-xl overflow-hidden">
              <img src={teamImages[1]} alt="Team Discussion" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="col-span-2 h-48 md:h-60 bg-gray-800 rounded-xl overflow-hidden">
              <img src={teamImages[2]} alt="Full Team" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 font-sans tracking-wide">
              Team
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Meet the minds behind the magic. A group of dedicated individuals
              working tirelessly to make this event a grand success.
            </p>
            <button
              onClick={() => openGallery('team')}
              className="w-fit px-8 py-3 rounded-full border border-purple-500 text-white font-semibold tracking-wider hover:bg-purple-500/20 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.5)] active:scale-95"
            >
              VIEW MORE
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GlassCard;