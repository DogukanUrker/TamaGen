import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TamaGen - Recipe Generator",
  description: "Transform ingredients into delicious recipes",
  keywords: [
    "recipe",
    "generator",
    "ai",
    "ingredients",
    "cooking",
    "food",
    "culinary",
    "kitchen",
    "meals",
    "dishes",
  ],
  openGraph: {
    title: "TamaGen - Recipe Generator",
    description: "Transform ingredients into delicious recipes",
    url: "https://tama-gen.vercel.app",
    siteName: "TamaGen",
    type: "website",
    images: [
      {
        url: "https://tama-gen.vercel.app/ogImage.png",
        width: 1200,
        height: 630,
        alt: "TamaGen - Recipe Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dogukanurker",
    title: "TamaGen - Recipe Generator",
    description: "Transform ingredients into delicious recipes",
    images: ["https://tama-gen.vercel.app/ogImage.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased min-h-screen bg-background text-foreground"
        )}
      >
        {children}
      </body>
    </html>
  );
}
