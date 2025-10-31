import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";

export const metadata: Metadata = {
  title: "Wrzuć Fotkę",
  description: "Zachowaj zdjęcia ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload Fabric.js for faster editor loading */}
        <link 
          rel="preload" 
          href="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js" 
          as="script" 
          crossOrigin="anonymous"
        />
        {/* Early script loading for better performance */}
        <script 
          src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js" 
          async
        ></script>
      </head>
      <body className="">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
