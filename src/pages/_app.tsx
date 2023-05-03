import "@jogo/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin", "greek"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={`pb-10 ${inter.className}`}>
        <Component {...pageProps} />
      </main>
      <Analytics />
    </>
  );
}
