import { GoogleAnalytics } from "@jogo/components/google-analytics";
import { ThemeProvider } from "@jogo/components/theme-provider";
import "@jogo/styles/globals.css";
import { BASE_URL } from "@jogo/lib/base-url";
import { Metadata, Viewport } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "greek"],
  variable: "--font-inter",
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin", "greek"],
  variable: "--font-roboto-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0E2418" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el" suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoCondensed.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
      {process.env.NODE_ENV === "production" && <GoogleAnalytics />}
    </html>
  );
}
