import styles from './page.module.css';

export default function StockMarketAnalyzer() {
    return (
        <div className={styles.container}>
            <iframe
                src="https://stock-market-analyzer-sigma.vercel.app/"
                className={styles.iframe}
                title="Stock Market Analyzer"
                allow="clipboard-write; clipboard-read"
            />
        </div>
    );
}
