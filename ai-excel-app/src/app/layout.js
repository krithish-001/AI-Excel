import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "AI Excel — The Future of Excel Logic",
  description:
    "AI-powered Excel support tool. Get instant formula explanations, debug complex spreadsheets, and master Excel with intelligent AI assistance.",
  keywords: [
    "AI Excel",
    "Excel formulas",
    "VLOOKUP",
    "XLOOKUP",
    "spreadsheet AI",
    "formula helper",
  ],
  openGraph: {
    title: "AI Excel — The Future of Excel Logic",
    description:
      "AI-powered Excel support. Instant formula explanations and intelligent spreadsheet assistance.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
