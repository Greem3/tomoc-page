import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/Footer";
import Script from "next/script";
import { MathJaxContext } from "better-react-mathjax";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const config = {
  tex: {
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
  startup: {
    typeset: false
  }
}

export const metadata: Metadata = {
  title: "TOMOC App",
  description: "Aplicación de olimpiadas matemáticas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} antialiased`}
      >
        <Header />

        <MathJaxContext config={config}>
          {children}
        </MathJaxContext>

        <Footer />
      </body>
    </html>
  );
}
