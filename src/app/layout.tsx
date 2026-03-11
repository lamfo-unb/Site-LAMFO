import type { Metadata } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LAMFO | Laboratório de Aprendizagem de Máquinas em Finanças e Organizações",
  description: "Think tank da Universidade de Brasília dedicado ao avanço da teoria de IA e promoção do uso ético da inteligência artificial na sociedade.",
  icons: {
    icon: "/favicon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${outfit.variable} ${sourceSans.variable} font-[family-name:var(--font-source-sans)]`}>
        {children}
      </body>
    </html>
  );
}
