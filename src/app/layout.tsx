import type { Metadata } from "next";
import {  Instrument_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "QuiHub",
  description: "Belajar Menyenangkan Bersama QuiHub!"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable}`}>
      <body
        className={`bg-main-white text-white lg:w-[1450px] mx-auto font-instrument`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
