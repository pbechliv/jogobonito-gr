import { GoogleAnalytics } from "@jogo/components/google-analytics";
import "@jogo/styles/globals.css";
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
      {process.env.NODE_ENV === "production" && <GoogleAnalytics />}
    </html>
  );
}
