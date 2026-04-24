import { Geist, Geist_Mono, Google_Sans } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const googleSans = Google_Sans({
  variable: '--font-google-sans',
  subsets: ['latin']
})