import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/Footer";
import { MathJaxContext } from "better-react-mathjax";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tomoc",
  description: "Tomoc es una app de matemáticas ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <Header />

        <MathJaxContext>
          {children}
        </MathJaxContext>
        
        <Footer />
      </body>
    </html>
  );
}
