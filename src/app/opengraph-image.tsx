import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Jogo Bonito — jogobonito.gr";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const robotoCondensedBold = await readFile(
    join(process.cwd(), "src/assets/RobotoCondensed-Bold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          backgroundColor: "#0E2418",
          fontFamily: "Roboto Condensed",
        }}
      >
        <svg width="160" height="160" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="#EFC004" />
          <polygon fill="#0E2418" points="16,10.5 10.77,14.3 12.77,20.45 19.23,20.45 21.23,14.3" />
          <path fill="#0E2418" d="M11.44 2.76L11.04 6.27L8.28 8.28L4.82 7.57A14 14 0 0 1 11.44 2.76Z" />
          <path fill="#0E2418" d="M2 16.24L5.21 17.71L6.27 20.96L4.53 24.03A14 14 0 0 1 2 16.24Z" />
          <path fill="#0E2418" d="M11.91 29.39L14.29 26.79L17.71 26.79L20.09 29.39A14 14 0 0 1 11.91 29.39Z" />
          <path fill="#0E2418" d="M27.47 24.03L25.73 20.96L26.79 17.71L30 16.24A14 14 0 0 1 27.47 24.03Z" />
          <path fill="#0E2418" d="M27.18 7.57L23.72 8.28L20.96 6.27L20.56 2.76A14 14 0 0 1 27.18 7.57Z" />
          <line stroke="#0E2418" strokeWidth="1.8" x1="16" y1="10.5" x2="16" y2="2" />
          <line stroke="#0E2418" strokeWidth="1.8" x1="10.77" y1="14.3" x2="2.69" y2="11.67" />
          <line stroke="#0E2418" strokeWidth="1.8" x1="12.77" y1="20.45" x2="7.77" y2="27.33" />
          <line stroke="#0E2418" strokeWidth="1.8" x1="19.23" y1="20.45" x2="24.23" y2="27.33" />
          <line stroke="#0E2418" strokeWidth="1.8" x1="21.23" y1="14.3" x2="29.31" y2="11.67" />
        </svg>
        <div
          style={{
            fontSize: 120,
            color: "#ffffff",
            letterSpacing: 4,
          }}
        >
          JOGO BONITO
        </div>
        <div style={{ fontSize: 34, color: "#A8C3B2", padding: "0 60px", textAlign: "center" }}>
          Ποδόσφαιρο, μπάσκετ και άλλα σπορ — μέσα και έξω από τους αγωνιστικούς
          χώρους
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 20,
            backgroundImage: "linear-gradient(to right, #EFC004, #0C6B39)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Roboto Condensed",
          data: robotoCondensedBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
