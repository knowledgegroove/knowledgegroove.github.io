import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Real Estate Analyzer | Knowledge Groove",
    description: "AI-powered real estate analysis and investment insights.",
};

export default function RealEstateAnalyzerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
