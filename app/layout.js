import "./globals.css";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Providers from "@/components/Providers";
import { profile } from "@/data/profile";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body antialiased`}>
        <Providers>
          <ScrollProgress />
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
