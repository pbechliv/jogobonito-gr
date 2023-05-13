import "@jogo/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "greek"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      {process.env.NODE_ENV === "production" && <Analytics />}
    </html>
  );
}
