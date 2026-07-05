import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const GREEN = "#0C6B39";

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
          backgroundColor: GREEN,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="#EFC004" />
          <polygon fill={GREEN} points="16,10.5 10.77,14.3 12.77,20.45 19.23,20.45 21.23,14.3" />
          <path fill={GREEN} d="M11.44 2.76L11.04 6.27L8.28 8.28L4.82 7.57A14 14 0 0 1 11.44 2.76Z" />
          <path fill={GREEN} d="M2 16.24L5.21 17.71L6.27 20.96L4.53 24.03A14 14 0 0 1 2 16.24Z" />
          <path fill={GREEN} d="M11.91 29.39L14.29 26.79L17.71 26.79L20.09 29.39A14 14 0 0 1 11.91 29.39Z" />
          <path fill={GREEN} d="M27.47 24.03L25.73 20.96L26.79 17.71L30 16.24A14 14 0 0 1 27.47 24.03Z" />
          <path fill={GREEN} d="M27.18 7.57L23.72 8.28L20.96 6.27L20.56 2.76A14 14 0 0 1 27.18 7.57Z" />
          <line stroke={GREEN} strokeWidth="1.8" x1="16" y1="10.5" x2="16" y2="2" />
          <line stroke={GREEN} strokeWidth="1.8" x1="10.77" y1="14.3" x2="2.69" y2="11.67" />
          <line stroke={GREEN} strokeWidth="1.8" x1="12.77" y1="20.45" x2="7.77" y2="27.33" />
          <line stroke={GREEN} strokeWidth="1.8" x1="19.23" y1="20.45" x2="24.23" y2="27.33" />
          <line stroke={GREEN} strokeWidth="1.8" x1="21.23" y1="14.3" x2="29.31" y2="11.67" />
        </svg>
      </div>
    ),
    size,
  );
}
