import { GoogleAnalytics } from "@jogo/components/google-analytics";
import { ThemeProvider } from "@jogo/components/theme-provider";
import "@jogo/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "greek"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el" suppressHydrationWarning>
      <body className={inter.className}>
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
