import styles from './HeroGraphic.module.css';

export default function HeroGraphic() {
    return (
        <div className={styles.container}>
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
