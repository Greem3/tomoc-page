import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/Footer";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
      <head>
        <Script
          id="MathJax-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.MathJax = {
                tex: {
                  inlineMath: [['$', '$']],
                  displayMath: [['$$', '$$']],
                  packages: ['base', 'ams', 'noerrors', 'noundefined']
                },
                options: {
                  ignoreHtmlClass: 'tex2jax_ignore',
                  processHtmlClass: 'tex2jax_process'
                },
                startup: {
                  typeset: false
                }
              };
            `,
          }}
        />
        <Script
          id="MathJax-script"
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
