"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Cloud, Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function RoboHead() {
    const groupRef = useRef();
    const jawRef = useRef();
    const { viewport } = useThree();
    const isMobile = viewport.width < 5; // Rough threshold for mobile in Three.js units

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15; // Increased sway slightly
        // Subtle jaw movement
        if (jawRef.current) {
            jawRef.current.rotation.x = 0.2 + Math.sin(t * 3) * 0.05; // Faster chatter
        }
    });

    return (
        <group ref={groupRef} scale={isMobile ? 0.9 : 1.3} position={[0, isMobile ? 0.5 : 0, 0]}> {/* Adjusted scale for mobile */}

            {/* --- HELMET (Detailed Tactical) --- */}
            <mesh position={[0, 0.65, -0.05]}>
                {/* Main Dome - Slightly flattened top */}
                <sphereGeometry args={[1.4, 64, 32, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
                <meshPhysicalMaterial
                    color="#4b5320" // Army Green / Olive Drab
                    metalness={0.4}
                    roughness={0.6}
                    clearcoat={0.1}
                    flatShading={false}
                />
            </mesh>

            {/* Helmet Rim Protection */}
            <mesh position={[0, 0.65, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.4, 0.05, 16, 100]} />
                <meshStandardMaterial color="#2d2d2d" metalness={0.5} roughness={0.8} />
            </mesh>

            {/* NVG Mount (Front Plate) */}
            <group position={[0, 1.45, 1.0]} rotation={[-0.3, 0, 0]}>
                <mesh>
                    <boxGeometry args={[0.5, 0.5, 0.1]} />
                    <meshStandardMaterial color="#2d2d2d" metalness={0.6} roughness={0.7} />
                </mesh>
                <mesh position={[0, 0, 0.05]}>
                    <boxGeometry args={[0.3, 0.3, 0.1]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.8} />
                </mesh>
                {/* Screws */}
                <mesh position={[0.2, 0.2, 0.05]}>
                    <sphereGeometry args={[0.03]} />
                    <meshStandardMaterial color="#888" metalness={1} />
                </mesh>
                <mesh position={[-0.2, 0.2, 0.05]}>
                    <sphereGeometry args={[0.03]} />
                    <meshStandardMaterial color="#888" metalness={1} />
                </mesh>
                <mesh position={[0.2, -0.2, 0.05]}>
                    <sphereGeometry args={[0.03]} />
                    <meshStandardMaterial color="#888" metalness={1} />
                </mesh>
                <mesh position={[-0.2, -0.2, 0.05]}>
                    <sphereGeometry args={[0.03]} />
                    <meshStandardMaterial color="#888" metalness={1} />
                </mesh>
            </group>

            {/* Side Rails / Straps */}
            <group position={[1.35, 0.8, 0]} rotation={[0, 0, -0.2]}>
                <mesh>
                    <boxGeometry args={[0.1, 0.8, 0.4]} />
                    <meshStandardMaterial color="#2d2d2d" />
                </mesh>
            </group>
            <group position={[-1.35, 0.8, 0]} rotation={[0, 0, 0.2]}>
                <mesh>
                    <boxGeometry args={[0.1, 0.8, 0.4]} />
                    <meshStandardMaterial color="#2d2d2d" />
                </mesh>
            </group>

            {/* Chin Strap (Canvas/Fabric look) */}
            <mesh position={[0, 0.68, 0]} rotation={[Math.PI / 2.1, 0, 0]}>
                <torusGeometry args={[1.42, 0.08, 16, 64, 3.5]} rotation={[0, 0, 3.5 / 2 + 2]} /> {/* Half circle for strap */}
                <meshStandardMaterial color="#3e3b34" roughness={0.9} />
            </mesh>

            {/* --- REALISTIC SKULL COMPOSITE --- */}
            <group position={[0, 0, 0]}>

                {/* 1. Cranium */}
                <mesh position={[0, 0.2, 0]}>
                    <sphereGeometry args={[1.15, 64, 64]} />
                    <meshPhysicalMaterial color="#C1E6D0" roughness={0.5} metalness={0.1} /> {/* Greenish Tint */}
                </mesh>

                {/* 2. Cheekbones */}
                <mesh position={[0.85, -0.4, 0.5]} scale={[0.55, 0.55, 0.55]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshPhysicalMaterial color="#C1E6D0" roughness={0.5} metalness={0.1} />
                </mesh>
                <mesh position={[-0.85, -0.4, 0.5]} scale={[0.55, 0.55, 0.55]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshPhysicalMaterial color="#C1E6D0" roughness={0.5} metalness={0.1} />
                </mesh>

                {/* 3. Nose Scale Mask (To flatten nose area) */}

                {/* --- AXLE (Connecting Wheels using Jaw) --- */}
                <mesh position={[0, -0.6, 0.2]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.15, 0.15, 3.8, 16]} />
                    <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* 4. Jaw (Mandible) */}
                <group ref={jawRef} position={[0, -0.3, -0.2]} rotation={[0.2, 0, 0]}>
                    {/* Jawbone */}
                    <mesh position={[0, -0.6, 0.6]} rotation={[0, 0, 0]}>
                        {/* Wider jaw to accommodate axle */}
                        <cylinderGeometry args={[0.75, 0.55, 0.7, 6]} />
                        <meshPhysicalMaterial color="#C1E6D0" roughness={0.5} metalness={0.1} />
                    </mesh>
                    {/* Chin */}
                    <mesh position={[0, -1.0, 0.9]}>
                        <sphereGeometry args={[0.45, 32, 32]} />
                        <meshPhysicalMaterial color="#C1E6D0" roughness={0.5} metalness={0.1} />
                    </mesh>

                    {/* --- TEETH (Lower Row) --- */}
                    <group position={[0, -0.35, 0.85]} rotation={[-0.1, 0, 0]}>
                        {[...Array(6)].map((_, i) => (
                            <mesh key={`lower-${i}`} position={[(i - 2.5) * 0.14, 0, 0]}>
                                <boxGeometry args={[0.12, 0.25, 0.1]} />
                                <meshPhysicalMaterial color="#C1E6D0" roughness={0.4} />
                            </mesh>
                        ))}
                    </group>
                </group>

                {/* 5. Eye Sockets */}
                <mesh position={[0.42, -0.1, 0.98]} scale={[1, 0.8, 0.4]}>
                    <sphereGeometry args={[0.38, 32, 32]} />
                    <meshStandardMaterial color="#050505" roughness={1} />
                </mesh>
                <mesh position={[-0.42, -0.1, 0.98]} scale={[1, 0.8, 0.4]}>
                    <sphereGeometry args={[0.38, 32, 32]} />
                    <meshStandardMaterial color="#050505" roughness={1} />
                </mesh>

                {/* 6. Nose Cavity */}
                <mesh position={[0, -0.5, 1.1]} rotation={[0, 0, 0]} scale={[1, 1.5, 0.5]}>
                    <coneGeometry args={[0.15, 0.3, 3]} />
                    <meshStandardMaterial color="#050505" roughness={1} />
                </mesh>

                {/* --- GLOWING EYES --- */}
                <mesh position={[0.42, -0.15, 1.05]}>
                    <sphereGeometry args={[0.12, 32, 32]} />
                    <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={8} toneMapped={false} />
                </mesh>
                <mesh position={[-0.42, -0.15, 1.05]}>
                    <sphereGeometry args={[0.12, 32, 32]} />
                    <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={8} toneMapped={false} />
                </mesh>

            </group>

            {/* --- WHEELS (Attached to Axle) --- */}
            <group position={[-1.9, -0.6, 0.2]} rotation={[0, 0, Math.PI / 2]}> {/* Lowered Y to match axle */}
                <mesh>
                    <cylinderGeometry args={[0.9, 0.9, 0.8, 32]} />
                    <meshPhysicalMaterial color="#111" roughness={0.8} />
                </mesh>
                <mesh>
                    <cylinderGeometry args={[0.55, 0.55, 0.82, 32]} />
                    <meshStandardMaterial color="#FDB813" metalness={1} roughness={0.2} />
                </mesh>
                <mesh>
                    <cylinderGeometry args={[0.92, 0.92, 0.6, 12]} />
                    <meshStandardMaterial color="#000" wireframe />
                </mesh>
            </group>

            <group position={[1.9, -0.6, 0.2]} rotation={[0, 0, Math.PI / 2]}>
                <mesh>
                    <cylinderGeometry args={[0.9, 0.9, 0.8, 32]} />
                    <meshPhysicalMaterial color="#111" roughness={0.8} />
                </mesh>
                <mesh>
                    <cylinderGeometry args={[0.55, 0.55, 0.82, 32]} />
                    <meshStandardMaterial color="#FDB813" metalness={1} roughness={0.2} />
                </mesh>
                <mesh>
                    <cylinderGeometry args={[0.92, 0.92, 0.6, 12]} />
                    <meshStandardMaterial color="#000" wireframe />
                </mesh>
            </group>

        </group>
    );
}

function SmogEffect() {
    return (
        <group>
            {/* Denser green smog - Adjusted positions */}
            <Cloud position={[-7, -2, -5]} opacity={0.6} speed={0.4} width={8} depth={4} segments={15} color="#00FF9E" />
            <Cloud position={[7, -2, -5]} opacity={0.6} speed={0.4} width={8} depth={4} segments={15} color="#00FF9E" />
            <Cloud position={[0, -5, 2]} opacity={0.3} speed={0.2} width={15} depth={3} segments={15} color="#052e16" />
        </group>
    )
}

export default function ThreeDSkull() {
    return (
        <div className="w-full h-full min-h-[500px] flex items-center justify-center pointer-events-none md:pointer-events-auto">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={40} />

                <Environment preset="city" />
                <ambientLight intensity={0.3} />
                <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
                <pointLight position={[0, 0, 2]} intensity={0.5} color="#FFD700" distance={5} />

                <Float speed={3} rotationIntensity={0.3} floatIntensity={0.3}> {/* Faster Float */}
                    <RoboHead />
                </Float>

                <SmogEffect />

                <ContactShadows position={[0, -4, 0]} opacity={0.6} scale={12} blur={3} far={4} color="#00FF9E" />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={1.5} // Increased 1.5x (was 0.5 -> ~0.8, requested 1.5c -> 1.5 value)
                    maxPolarAngle={Math.PI / 1.6}
                    minPolarAngle={Math.PI / 2.5}
                />
            </Canvas>
        </div>
    );
}
