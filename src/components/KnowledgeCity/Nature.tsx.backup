'use client';

import { useMemo, useRef } from 'react';
import { Instance, Instances } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export function Trees({ count = 50, area = 100 }: { count?: number, area?: number }) {
    const trees = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * area;
            const z = (Math.random() - 0.5) * area - 50;
            // Avoid placing trees on the main road path (center)
            if (Math.abs(x) < 15) continue;
            const scale = 1.2 + Math.random() * 1.5; // Larger, more varied sizes
            const treeType = Math.random() > 0.6 ? 'pine' : 'deciduous';
            const height = 3 + Math.random() * 4; // Varied heights
            temp.push({ position: [x, 0, z], scale, treeType, height });
        }
        return temp;
    }, [count, area]);

    const pines = trees.filter(t => t.treeType === 'pine');
    const deciduous = trees.filter(t => t.treeType === 'deciduous');

    return (
        <group>
            {/* Pine Tree Trunks */}
            <Instances range={pines.length}>
                <cylinderGeometry args={[0.25, 0.35, 1, 8]} />
                <meshStandardMaterial color="#2d1f15" roughness={0.95} />
                {pines.map((data, i) => (
                    <Instance
                        key={i}
                        position={[data.position[0], data.height * 0.3, data.position[2]] as any}
                        scale={[data.scale * 0.8, data.height * 0.6, data.scale * 0.8] as any}
                    />
                ))}
            </Instances>

            {/* Pine Tree Foliage - Multiple Layers */}
            <Instances range={pines.length * 3}>
                <coneGeometry args={[1, 2, 8]} />
                <meshStandardMaterial color="#1a3d1a" roughness={0.85} />
                {pines.flatMap((data, i) => [
                    // Bottom layer
                    <Instance
                        key={`${i}-0`}
                        position={[data.position[0], data.height * 0.5, data.position[2]] as any}
                        scale={[data.scale * 1.2, data.scale * 1.2, data.scale * 1.2] as any}
                    />,
                    // Middle layer
                    <Instance
                        key={`${i}-1`}
                        position={[data.position[0], data.height * 0.7, data.position[2]] as any}
                        scale={[data.scale * 0.9, data.scale * 0.9, data.scale * 0.9] as any}
                    />,
                    // Top layer
                    <Instance
                        key={`${i}-2`}
                        position={[data.position[0], data.height * 0.85, data.position[2]] as any}
                        scale={[data.scale * 0.6, data.scale * 0.6, data.scale * 0.6] as any}
                    />
                ])}
            </Instances>

            {/* Deciduous Tree Trunks */}
            <Instances range={deciduous.length}>
                <cylinderGeometry args={[0.2, 0.4, 1, 8]} />
                <meshStandardMaterial color="#3d2817" roughness={0.95} />
                {deciduous.map((data, i) => (
                    <Instance
                        key={i}
                        position={[data.position[0], data.height * 0.35, data.position[2]] as any}
                        scale={[data.scale * 0.7, data.height * 0.7, data.scale * 0.7] as any}
                    />
                ))}
            </Instances>

            {/* Deciduous Tree Foliage - Irregular clusters */}
            <Instances range={deciduous.length * 4}>
                <sphereGeometry args={[1, 6, 6]} />
                <meshStandardMaterial color="#2d5016" roughness={0.8} />
                {deciduous.flatMap((data, i) => {
                    const offsets = [
                        [0, 0, 0],
                        [0.3, 0.2, 0.2],
                        [-0.3, 0.1, -0.2],
                        [0.2, -0.1, 0.3]
                    ];
                    return offsets.map((offset, j) => (
                        <Instance
                            key={`${i}-${j}`}
                            position={[
                                data.position[0] + offset[0] * data.scale,
                                data.height * 0.75 + offset[1] * data.scale,
                                data.position[2] + offset[2] * data.scale
                            ] as any}
                            scale={[
                                data.scale * (0.8 + Math.random() * 0.4),
                                data.scale * (0.7 + Math.random() * 0.3),
                                data.scale * (0.8 + Math.random() * 0.4)
                            ] as any}
                        />
                    ));
                })}
            </Instances>
        </group>
    );
}

export function Mountains() {
    // Create trees for mountain slopes
    const mountainTrees = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 80; i++) {
            // Distribute trees on mountain slopes
            const side = Math.random() > 0.5 ? -1 : 1;
            const x = side * (30 + Math.random() * 40);
            const z = -80 - Math.random() * 40;
            const y = Math.random() * 12; // Trees at various elevations
            const scale = 0.8 + Math.random() * 0.5;
            temp.push({ position: [x, y, z], scale });
        }
        return temp;
    }, []);

    return (
        <group position={[0, -1, -100]}>
            {/* Left Mountain Range */}
            <mesh position={[-55, 0, -20]} rotation={[0, 0.2, 0]}>
                <coneGeometry args={[28, 45, 8]} />
                <meshStandardMaterial color="#6b8e5a" roughness={0.9} />
            </mesh>
            <mesh position={[-40, 0, -10]} rotation={[0, 0.1, 0]}>
                <coneGeometry args={[22, 38, 8]} />
                <meshStandardMaterial color="#5a7d49" roughness={0.9} />
            </mesh>
            <mesh position={[-48, 0, -35]} rotation={[0, -0.1, 0]}>
                <coneGeometry args={[25, 42, 8]} />
                <meshStandardMaterial color="#6b8e5a" roughness={0.9} />
            </mesh>

            {/* Right Mountain Range */}
            <mesh position={[55, 0, -15]} rotation={[0, -0.2, 0]}>
                <coneGeometry args={[26, 43, 8]} />
                <meshStandardMaterial color="#6b8e5a" roughness={0.9} />
            </mesh>
            <mesh position={[42, 0, -8]} rotation={[0, -0.15, 0]}>
                <coneGeometry args={[20, 36, 8]} />
                <meshStandardMaterial color="#5a7d49" roughness={0.9} />
            </mesh>
            <mesh position={[50, 0, -30]} rotation={[0, 0.1, 0]}>
                <coneGeometry args={[24, 40, 8]} />
                <meshStandardMaterial color="#6b8e5a" roughness={0.9} />
            </mesh>

            {/* Distant Central Mountains */}
            <mesh position={[-15, 2, -50]} rotation={[0, 0.05, 0]}>
                <coneGeometry args={[35, 55, 8]} />
                <meshStandardMaterial color="#7c9a6d" roughness={0.9} />
            </mesh>
            <mesh position={[0, 3, -60]} rotation={[0, 0, 0]}>
                <coneGeometry args={[40, 60, 8]} />
                <meshStandardMaterial color="#8aa87a" roughness={0.9} />
            </mesh>
            <mesh position={[18, 2, -55]} rotation={[0, -0.08, 0]}>
                <coneGeometry args={[32, 52, 8]} />
                <meshStandardMaterial color="#7c9a6d" roughness={0.9} />
            </mesh>

            {/* Trees on Mountain Slopes */}
            <Instances range={mountainTrees.length}>
                <cylinderGeometry args={[0.2, 0.3, 2, 6]} />
                <meshStandardMaterial color="#3d2817" roughness={0.95} />
                {mountainTrees.map((data, i) => (
                    <Instance
                        key={i}
                        position={data.position as any}
                        scale={[data.scale, data.scale, data.scale] as any}
                    />
                ))}
            </Instances>

            {/* Tree Foliage on Mountains */}
            <Instances range={mountainTrees.length}>
                <coneGeometry args={[1.2, 3, 6]} />
                <meshStandardMaterial color="#2d5016" roughness={0.85} />
                {mountainTrees.map((data, i) => (
                    <Instance
                        key={i}
                        position={[data.position[0], data.position[1] + 2, data.position[2]] as any}
                        scale={[data.scale, data.scale, data.scale] as any}
                    />
                ))}
            </Instances>
        </group>
    );
}


// Smaller, more realistic car component
function Car({ position, color }: { position: [number, number, number], color: string }) {
    return (
        <group position={position} scale={0.4}>
            {/* Car Body */}
            <mesh position={[0, 0.3, 0]}>
                <boxGeometry args={[1.8, 0.6, 4]} />
                <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Car Roof */}
            <mesh position={[0, 0.8, -0.3]}>
                <boxGeometry args={[1.6, 0.6, 2]} />
                <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Windshield */}
            <mesh position={[0, 0.8, 0.8]}>
                <boxGeometry args={[1.5, 0.5, 0.1]} />
                <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Wheels */}
            <mesh position={[-0.9, -0.1, 1.2]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[0.9, -0.1, 1.2]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[-0.9, -0.1, -1.2]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[0.9, -0.1, -1.2]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
        </group>
    );
}

// Highway Cars - animated based on scroll
export function HighwayCars() {
    const scroll = useScroll();
    const carsRef = useRef<THREE.Group>(null);

    const cars = useMemo(() => [
        { lane: -1.5, offset: 0, color: '#ff4444', speed: 1.2 },
        { lane: -1.5, offset: -30, color: '#4444ff', speed: 1.0 },
        { lane: -1.5, offset: -60, color: '#44ff44', speed: 1.3 },
        { lane: 1.5, offset: -15, color: '#ffff44', speed: 1.1 },
        { lane: 1.5, offset: -45, color: '#ff44ff', speed: 0.9 },
        { lane: 1.5, offset: -75, color: '#44ffff', speed: 1.15 },
    ], []);

    useFrame(() => {
        if (carsRef.current) {
            const scrollSpeed = scroll.offset * 200; // Convert scroll to distance

            carsRef.current.children.forEach((carGroup: any, i) => {
                const car = cars[i];
                // Move cars based on scroll
                const newZ = (car.offset - scrollSpeed * car.speed) % 120;
                carGroup.position.z = newZ > 20 ? newZ - 120 : newZ;
            });
        }
    });

    return (
        <group ref={carsRef} position={[0, 0.2, 0]}>
            {cars.map((car, i) => (
                <group key={i} position={[car.lane, 0, car.offset]}>
                    <Car position={[0, 0, 0]} color={car.color} />
                </group>
            ))}
        </group>
    );
}
