import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { portfolio } from "@/data/portfolio";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${portfolio.profile.displayName} — ${portfolio.profile.title}`,
  description: portfolio.profile.shortBio,
  openGraph: {
    title: `${portfolio.profile.displayName} — ${portfolio.profile.title}`,
    description: portfolio.profile.shortBio,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolio.profile.displayName} — ${portfolio.profile.title}`,
    description: portfolio.profile.shortBio,
  },
  icons: {
    icon: "/logo-mark.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased max-lg:scrollbar-none`}
    >
      <body className="page-fade min-h-full bg-background text-foreground">
        {children}
        <LoadingScreen />
      </body>
    </html>
  );
}
