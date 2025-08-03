import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: ` Sri Raghavendra Savoury & Sweet Home | Best Sweet Store in Tirupati`,
  description: "Experience the finest traditional sweets and savouries at Sri Raghavendra Savoury & Sweet Home in Tirupati",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Sri Raghavendra Savoury & Sweet Home",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Theertha Katta St, Nehru Nagar",
              "addressLocality": "Tirupati",
              "addressRegion": "Andhra Pradesh",
              "postalCode": "517501",
              "addressCountry": "IN"
            },
            "telephone": "+91-9876543210",
            // "url": "https://sriraghavendrasweets.in",
            "openingHours": "Mo-Su 08:30-21:30"
          })
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
