// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header"; // Import Header

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KKN 234 Mangunarga",
  description: "Website resmi kelompok KKN 234 Desa Mangunarga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50`}>
        <Header /> {/* Tambahkan Header di sini */}
        <main>{children}</main>
      </body>
    </html>
  );
}