import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/free-mode";

const CreatoDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/CreatoDisplay-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/CreatoDisplay-Medium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/CreatoDisplay-Bold.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/CreatoDisplay-Black.otf",
      weight: "900",
    },
  ],
  variable: "--font-CreatoDisplay",
});

export const metadata: Metadata = {
  title: "Memunat Portfolio",
  description: "User Experience and Interface Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${CreatoDisplay.variable} bg-[#191919] antialiased`}>
        {children}
      </body>
    </html>
  );
}
