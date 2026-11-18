import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE BODY — Architecture for the Entire Silhouette",
  description:
    "Organic, warm lifestyle wardrobe engineered for the entire body: Homestay Sanctuary, Kinetic Activewear, Urban Streetwear, Atelier Evening, Sculptural Jewelry, and Grounded Footwear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAF6F0] text-[#231B18] font-sans selection:bg-[#B85D3B] selection:text-[#FAF6F0]">
        {children}
      </body>
    </html>
  );
}

