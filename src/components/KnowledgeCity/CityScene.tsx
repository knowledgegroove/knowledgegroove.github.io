'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Experience from './Experience';
import Overlay from './Overlay';

export default function CityScene() {
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 10 }}>
            <Canvas shadows dpr={[1, 2]}>
                <ScrollControls pages={5} damping={0.2}>
                    <Experience />
                    <Overlay />
                </ScrollControls>
            </Canvas>
        </div>
    );
}
