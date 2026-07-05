import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0C6B39",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="#EFC004" />
          <polygon
            fill="#0C6B39"
            points="16,9.5 9.82,13.99 12.18,21.26 19.82,21.26 22.18,13.99"
          />
          <line x1="16" y1="9.5" x2="16" y2="4" stroke="#0C6B39" strokeWidth="2" strokeLinecap="round" />
          <line x1="9.82" y1="13.99" x2="4.59" y2="12.29" stroke="#0C6B39" strokeWidth="2" strokeLinecap="round" />
          <line x1="12.18" y1="21.26" x2="8.95" y2="25.71" stroke="#0C6B39" strokeWidth="2" strokeLinecap="round" />
          <line x1="19.82" y1="21.26" x2="23.05" y2="25.71" stroke="#0C6B39" strokeWidth="2" strokeLinecap="round" />
          <line x1="22.18" y1="13.99" x2="27.41" y2="12.29" stroke="#0C6B39" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
