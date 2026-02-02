"use client";
import { useState, useEffect } from "react";

export default function CustomCursor() {
    const [mouseKiPosition, setMouseKiPosition] = useState({ x: 0, y: 0 });
    const [ringKiPosition, setRingKiPosition] = useState({ x: 0, y: 0 });
    const [dikhaoDot, setDikhaoDot] = useState(false);
    const [hoverMode, setHoverMode] = useState(false);
    const [rotateAngle, setRotateAngle] = useState(0);

    useEffect(() => {
        const mouseChala = (e) => {
            setMouseKiPosition({ x: e.clientX, y: e.clientY });
            setDikhaoDot(true);
        };

        const hoverCheck = () => {
            const links = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
            links.forEach((el) => {
                el.addEventListener("mouseenter", () => setHoverMode(true));
                el.addEventListener("mouseleave", () => setHoverMode(false));
            });
        };

        window.addEventListener("mousemove", mouseChala);
        hoverCheck();

        const observer = new MutationObserver(hoverCheck);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", mouseChala);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        let animationId;
        const smoothRing = () => {
            setRingKiPosition((prev) => ({
                x: prev.x + (mouseKiPosition.x - prev.x) * 0.35,
                y: prev.y + (mouseKiPosition.y - prev.y) * 0.35,
            }));
            setRotateAngle((prev) => (prev + 1) % 360);
            animationId = requestAnimationFrame(smoothRing);
        };
        animationId = requestAnimationFrame(smoothRing);
        return () => cancelAnimationFrame(animationId);
    }, [mouseKiPosition]);

    if (typeof window !== "undefined" && window.innerWidth < 768) return null;

    return (
        <>
            <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

            {dikhaoDot && (
                <>
                    <div
                        className="fixed pointer-events-none z-[99999]"
                        style={{
                            left: mouseKiPosition.x,
                            top: mouseKiPosition.y,
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <div className={`relative transition-all duration-150 ${hoverMode ? "scale-150" : "scale-100"}`}>
                            <div className="w-3 h-3 bg-[#00FF9E] clip-path-hexagon shadow-[0_0_10px_#00FF9E,0_0_20px_#00FF9E]"
                                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />
                        </div>
                    </div>

                    <div
                        className="fixed pointer-events-none z-[99998]"
                        style={{
                            left: ringKiPosition.x,
                            top: ringKiPosition.y,
                            transform: `translate(-50%, -50%) rotate(${rotateAngle}deg)`,
                        }}
                    >
                        <div className={`relative transition-all duration-200 ${hoverMode ? "scale-125" : "scale-100"}`}>
                            <svg
                                width={hoverMode ? "60" : "44"}
                                height={hoverMode ? "60" : "44"}
                                viewBox="0 0 44 44"
                                className="transition-all duration-200"
                            >
                                <polygon
                                    points="22,2 40,12 40,32 22,42 4,32 4,12"
                                    fill="none"
                                    stroke={hoverMode ? "#00FF9E" : "#00d4ff"}
                                    strokeWidth="1.5"
                                    className="transition-all duration-200"
                                    style={{
                                        filter: `drop-shadow(0 0 ${hoverMode ? "8px" : "4px"} ${hoverMode ? "#00FF9E" : "#00d4ff"})`
                                    }}
                                />

                                <line x1="22" y1="0" x2="22" y2="6" stroke={hoverMode ? "#00FF9E" : "#00d4ff"} strokeWidth="1" opacity="0.7" />
                                <line x1="22" y1="38" x2="22" y2="44" stroke={hoverMode ? "#00FF9E" : "#00d4ff"} strokeWidth="1" opacity="0.7" />
                                <line x1="0" y1="22" x2="6" y2="22" stroke={hoverMode ? "#00FF9E" : "#00d4ff"} strokeWidth="1" opacity="0.7" />
                                <line x1="38" y1="22" x2="44" y2="22" stroke={hoverMode ? "#00FF9E" : "#00d4ff"} strokeWidth="1" opacity="0.7" />

                                <circle cx="22" cy="2" r="1.5" fill={hoverMode ? "#00FF9E" : "#00d4ff"} />
                                <circle cx="40" cy="12" r="1.5" fill={hoverMode ? "#00FF9E" : "#00d4ff"} />
                                <circle cx="40" cy="32" r="1.5" fill={hoverMode ? "#00FF9E" : "#00d4ff"} />
                                <circle cx="22" cy="42" r="1.5" fill={hoverMode ? "#00FF9E" : "#00d4ff"} />
                                <circle cx="4" cy="32" r="1.5" fill={hoverMode ? "#00FF9E" : "#00d4ff"} />
                                <circle cx="4" cy="12" r="1.5" fill={hoverMode ? "#00FF9E" : "#00d4ff"} />
                            </svg>

                            {hoverMode && (
                                <div
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{ transform: `rotate(${-rotateAngle * 2}deg)` }}
                                >
                                    <svg width="30" height="30" viewBox="0 0 30 30">
                                        <polygon
                                            points="15,3 26,9 26,21 15,27 4,21 4,9"
                                            fill="none"
                                            stroke="#00FF9E"
                                            strokeWidth="0.5"
                                            opacity="0.5"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        className="fixed pointer-events-none z-[99997] opacity-30"
                        style={{
                            left: ringKiPosition.x,
                            top: ringKiPosition.y,
                            transform: `translate(-50%, -50%) rotate(${-rotateAngle * 0.5}deg)`,
                        }}
                    >
                        <svg width="60" height="60" viewBox="0 0 60 60">
                            <circle cx="30" cy="30" r="28" fill="none" stroke="#00d4ff" strokeWidth="0.5" strokeDasharray="4 8" />
                        </svg>
                    </div>
                </>
            )}
        </>
    );
}
