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
  title: "TOSMOC",
  description: "Aplicación de olimpiadas matemáticas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body
        className={`${inter.variable} antialiased min-h-full flex flex-col`}
      >
        <Header />

        <main className="flex-grow">
          <MathJaxContext config={config}>
            {children}
          </MathJaxContext>
        </main>

        <Footer />
      </body>
    </html>
  );
}
