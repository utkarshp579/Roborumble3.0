"use client"

import React from 'react'

export default function Patrons() {

    // 1. CHIEF PATRON DATA (Updated Name)
    const chiefPatron = {
        name: " Vinay Pathak",
        role: "Vice Chancellor",
        designation: "CSJM University, Kanpur", // University ka naam agar alag hai to yahan change karlena
        image: "/images/vc.jpeg"
    }

    // 2. PATRONS DATA (3 Log)
    const patrons = [
        {
            name: "Dr. Shilpa Deshpande",
            role: "Dean of Innovation",
            image: "/images/shilpa.jpeg"
        },
        {
            name: "Dr. Alok Mishra",
            role: "Director",
            image: "/images/alok.jpeg"
        },
        {
            name: "Mr. Divyansh Shukla",
            role: "CEO",
            image: "/images/divyansh.jpeg"
        },
    ]

    // 3. FACULTY COORDINATORS DATA (2 Log)
    const faculty = [
        {
            name: "Mr. Ajay Tiwari",
            role: "Faculty Coordinator",
            image: "/images/ajay.jpeg"
        },
        {
            name: "Er. Mohd Shah Aalam",
            role: "Faculty Coordinator",
            image: "/images/shah.jpeg"
        },
    ]

    // --- REUSABLE CARD COMPONENT ---
    const PersonCard = ({ name, role, designation, image, isChief = false }) => (
        <div className="flex flex-col items-center group relative z-10">

            {/* PHOTO CONTAINER */}
            <div className={`relative ${isChief ? 'w-52 h-52 md:w-64 md:h-64' : 'w-40 h-40 md:w-48 md:h-48'} mb-6`}>

                {/* 1. Neon Glow Background */}
                <div className="absolute inset-0 rounded-full bg-[#00FF9E] blur-[25px] opacity-20 group-hover:opacity-50 transition-opacity duration-500"></div>

                {/* 2. Rotating Ring */}
                <div className="absolute inset-[-6px] rounded-full border-2 border-transparent border-t-[#00FF9E] border-l-[#00FF9E] opacity-80 animate-spin-slow"></div>

                {/* 3. Image Circle */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#00FF9E]/50 group-hover:border-[#00FF9E] shadow-[0_0_20px_rgba(0,255,158,0.3)] transition-all duration-300 bg-gray-900">

                    {/* Image / Placeholder */}
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        {/* Icon fallback */}
                        <svg className={`text-white/20 ${isChief ? 'w-24 h-24' : 'w-16 h-16'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>

                        {/* REAL IMAGE TAG (Uncomment below line) */}
                        <img src={image} alt={name} className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* TEXT DETAILS */}
            <div className="text-center">
                <h3 className={`${isChief ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'} font-bold text-white uppercase tracking-wider group-hover:text-[#00FF9E] transition-colors drop-shadow-lg`}>
                    {name}
                </h3>

                {/* Divider */}
                <div className={`h-1 bg-[#00FF9E] mx-auto rounded-full my-3 shadow-[0_0_8px_#00FF9E] ${isChief ? 'w-32' : 'w-16'}`}></div>

                <p className={`${isChief ? 'text-xl' : 'text-sm'} text-[#00FF9E] tracking-[0.2em] uppercase font-bold`}>
                    {role}
                </p>

                {designation && (
                    <p className="text-white/70 text-xs md:text-sm mt-1 tracking-widest uppercase font-light">
                        {designation}
                    </p>
                )}
            </div>
        </div>
    )

    return (
        <div className="w-full flex flex-col items-center gap-24 pb-20">

            {/* ================= SECTION 1: CHIEF PATRON (Vinay Pathak) ================= */}
            <div className="w-full flex flex-col items-center">

                {/* HEADING: CHIEF PATRON */}
                <div className="relative mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                        Chief Patron
                    </h1>
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF9E] to-transparent mt-4"></div>
                </div>

                <PersonCard
                    name={chiefPatron.name}
                    role={chiefPatron.role}
                    designation={chiefPatron.designation}
                    image={chiefPatron.image}
                    isChief={true}
                />
            </div>


            {/* ================= SECTION 2: PATRONS (3 Log) ================= */}
            <div className="w-full flex flex-col items-center">

                {/* HEADING: PATRONS */}
                <div className="relative mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-[0.2em] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        Patrons
                    </h2>
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF9E]/50 to-transparent mt-4"></div>
                </div>

                {/* Grid for 3 People */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20 w-full max-w-7xl px-4 justify-items-center">
                    {patrons.map((p, index) => (
                        <PersonCard key={index} {...p} />
                    ))}
                </div>
            </div>


            {/* ================= SECTION 3: FACULTY COORDINATORS (2 Log) ================= */}
            <div className="w-full flex flex-col items-center">

                {/* HEADING: FACULTY COORDINATORS */}
                <div className="relative mb-16 text-center">
                    <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-[0.2em] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        Faculty Coordinators
                    </h2>
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF9E]/50 to-transparent mt-4"></div>
                </div>

                {/* Grid for 2 People */}
                <div className="flex flex-col md:flex-row gap-20 md:gap-40 items-center justify-center w-full px-4">
                    {faculty.map((f, index) => (
                        <PersonCard key={index} {...f} />
                    ))}
                </div>
            </div>

        </div>
    )
}