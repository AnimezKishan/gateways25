import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { PageTransitionProvider } from "@/hooks/usePageTransition";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gateways 2k25",
  description: "Gateways 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#111117]`}
      >
        <PageTransitionProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
          <PageTransitionWrapper />
        </PageTransitionProvider>
      </body>
    </html>
  );
}
