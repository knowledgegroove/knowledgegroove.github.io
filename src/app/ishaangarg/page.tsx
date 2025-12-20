import styles from './page.module.css';
import Link from 'next/link';

export const metadata = {
    title: 'Ishaan Garg | Knowledge Groove',
    description: 'Personal portfolio and profile of Ishaan Garg, Founder of Knowledge Groove.',
};

export default function IshaanGargPage() {
    return (
        <main className={styles.container}>
            <section className={`${styles.hero} animate-fade-up`}>
                <h1 className="gradient-text-primary">
                    Hi, I'm Ishaan Garg
                </h1>
                <p>
                    Founder of Knowledge Groove. <br />
                    Building the intersection of FinTech, AI, and Immersive Education.
                </p>
                <div className={styles.socialLinks}>
                    <Link href="/" className={styles.socialIcon}>
                        Visit Knowledge Groove
                    </Link>
                    <a href="mailto:contact@knowledgegroove.com" className={styles.socialIcon}>
                        Get in Touch
                    </a>
                </div>
            </section>

            <div className={styles.grid}>
                <div className={`glass-card animate-fade-up delay-100`}>
                    <div className={styles.cardContent}>
                        <h2 className={styles.cardTitle}>About Me</h2>
                        <p className={styles.cardText}>
                            I'm a visionary developer and entrepreneur dedicated to transforming how we learn and interact with financial data.
                            My mission is to make complex topics accessible through cutting-edge technology and immersive design.
                        </p>
                    </div>
                </div>

                <div className={`glass-card animate-fade-up delay-200`}>
                    <div className={styles.cardContent}>
                        <h2 className={styles.cardTitle}>The Vision</h2>
                        <p className={styles.cardText}>
                            Knowledge Groove isn't just a website; it's a digital ecosystem.
                            From a 3D city that visualizes concepts to AI agents that analyze real-time market data,
                            we are pushing the boundaries of what the web can do.
                        </p>
                        <div className={styles.tagContainer}>
                            <span className={styles.tag}>Innovation</span>
                            <span className={styles.tag}>Education</span>
                            <span className={styles.tag}>Future Tech</span>
                        </div>
                    </div>
                </div>

                <div className={`glass-card animate-fade-up delay-300`}>
                    <div className={styles.cardContent}>
                        <h2 className={styles.cardTitle}>Technical Expertise</h2>
                        <p className={styles.cardText}>
                            Specializing in full-stack development with a focus on 3D graphics (Three.js),
                            AI integration (LLMs, Predictive Models), and modern web frameworks (Next.js).
                        </p>
                        <div className={styles.tagContainer}>
                            <span className={styles.tag}>Next.js</span>
                            <span className={styles.tag}>React</span>
                            <span className={styles.tag}>Three.js</span>
                            <span className={styles.tag}>Python</span>
                            <span className={styles.tag}>AI/ML</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
