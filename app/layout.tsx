import type { Metadata } from "next";
import "./globals.css";
import { googleSans } from "@/fonts/fonts";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Haerunnas",
  openGraph: {
    images: '/logoipsum-291.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col ${googleSans.className}`}>{children}</body>
    </html>
  );
}
