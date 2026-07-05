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
          <polygon
            fill="#0E2418"
            points="16,9.5 9.82,13.99 12.18,21.26 19.82,21.26 22.18,13.99"
          />
          <line x1="16" y1="9.5" x2="16" y2="4" stroke="#0E2418" strokeWidth="2" strokeLinecap="round" />
          <line x1="9.82" y1="13.99" x2="4.59" y2="12.29" stroke="#0E2418" strokeWidth="2" strokeLinecap="round" />
          <line x1="12.18" y1="21.26" x2="8.95" y2="25.71" stroke="#0E2418" strokeWidth="2" strokeLinecap="round" />
          <line x1="19.82" y1="21.26" x2="23.05" y2="25.71" stroke="#0E2418" strokeWidth="2" strokeLinecap="round" />
          <line x1="22.18" y1="13.99" x2="27.41" y2="12.29" stroke="#0E2418" strokeWidth="2" strokeLinecap="round" />
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
