import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Stock Market Analyzer | Knowledge Groove",
    description: "Advanced stock market analysis tool powered by AI.",
};

export default function StockMarketAnalyzerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
