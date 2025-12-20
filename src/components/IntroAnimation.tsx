'use client';

import { useEffect, useState } from 'react';
import styles from './IntroAnimation.module.css';

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
    const [collapsing, setCollapsing] = useState(false);

    useEffect(() => {
        // Start collapse sequence
        const collapseTimer = setTimeout(() => {
            setCollapsing(true);
        }, 2000);

        // Complete animation
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 4000);

        return () => {
            clearTimeout(collapseTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div className={`${styles.container} ${collapsing ? styles.collapsing : ''}`}>
            <div className={styles.content}>
                <div className={styles.core}></div>

                {/* Math Ring */}
                <div className={`${styles.ring} ${styles.ring1}`}>
                    <span className={styles.symbol}>∑</span>
                    <span className={styles.symbol}>π</span>
                    <span className={styles.symbol}>∫</span>
                </div>

                {/* Finance Ring */}
                <div className={`${styles.ring} ${styles.ring2}`}>
                    <span className={styles.symbol}>$</span>
                    <span className={styles.symbol}>%</span>
                    <span className={styles.symbol}>📈</span>
                    <span className={styles.symbol}>¥</span>
                </div>

                {/* Tech/Comm Ring */}
                <div className={`${styles.ring} ${styles.ring3}`}>
                    <span className={styles.symbol}>{`{}`}</span>
                    <span className={styles.symbol}>@</span>
                    <span className={styles.symbol}>AI</span>
                    <span className={styles.symbol}>⚡</span>
                </div>
            </div>
        </div>
    );
}
