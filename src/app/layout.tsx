import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Desi Dutch | Royal Indian Gastronomy meets Amsterdam Canals",
  description:
    "An exquisite Indo-Dutch fusion restaurant on Prinsengracht, Amsterdam. Where the Pink City of Jaipur meets 17th-century canal houses. Authentic tandoor, Butter Chicken Bitterballen, and Gouda Naan.",
  keywords: [
    "Desi Dutch",
    "Indian restaurant Amsterdam",
    "Prinsengracht restaurant",
    "Indo-Dutch fusion",
    "Butter Chicken Bitterballen",
    "Jaipur food Amsterdam",
    "Halal Indian food Amsterdam",
  ],
  authors: [{ name: "Desi Dutch Culinary Brigade" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#E07A5F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen bg-cream font-sans text-amsterdam-canal antialiased selection:bg-jaipur-terracotta selection:text-white">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
