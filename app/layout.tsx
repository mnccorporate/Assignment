import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], display: "swap" }); // Improves font loading

export const metadata: Metadata = {
  title: "Next.js Authentication",
  description: "A secure authentication system built with Next.js and Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="min-h-screen">{children}</main> {/* Ensures consistent layout */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
