import type { Metadata, Viewport } from "next";
import { Archivo, Atkinson_Hyperlegible, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Tabs } from "@/components/Tabs";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Siap TOEFL ITP",
  description:
    "Belajar TOEFL ITP gratis: materi, latihan berpembahasan, 10 paket tes lengkap, 10 paket tes singkat, pembahasan dengan materi, dan rapor latihan.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/* Warna aksen tiap bagian dipasang di <html>, sebelum paint supaya tidak berkedip saat halaman dibuka langsung. */
const SET_SECTION = `document.documentElement.dataset.sec=location.pathname.split("/")[1]||"mulai"`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${archivo.variable} ${atkinson.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SET_SECTION }} />
      </head>
      <body>
        <Header />
        <Tabs />
        <main>
          <div className="wrap">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
