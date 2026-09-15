import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";

const Aspekta = localFont({
  src: [
    {
      path: "../../public/fonts/Aspekta-400.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Aspekta-500.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/Aspekta-700.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/Aspekta-700.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Aspekta-900.otf",
      weight: "900",
    },
  ],
  variable: "--font-Aspekta",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Maimunah Awotundun - Product Designer",
  description: "User Experience and Interface Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Aspekta.variable} ${inter.variable} bg-[#09090B] antialiased overflow-x-hidden`}
      >
        <CustomCursor />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
