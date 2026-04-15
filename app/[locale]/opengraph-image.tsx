import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default async function Image() {
  // Fetch Cormorant Garamond from Google Fonts for the heading
  const cormorantRes = await fetch(
    "https://fonts.gstatic.com/s/cormorantgaramond/v22/co3YmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2"
  );
  const cormorantData = await cormorantRes.arrayBuffer();

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px 90px",
          position: "relative",
        }}
      >
        {/* Gold accent bar — top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            backgroundColor: "#c8a96e",
          }}
        />

        {/* Bottom content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Office tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "1px",
                backgroundColor: "#c8a96e",
              }}
            />
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: "14px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#c8a96e",
              }}
            >
              Architecture Office
            </span>
          </div>

          {/* DarSaif name */}
          <div
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: "120px",
              fontWeight: 300,
              color: "#f0f0f0",
              lineHeight: 1,
              letterSpacing: "-2px",
            }}
          >
            DarSaif
          </div>

          {/* Location */}
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: "15px",
              letterSpacing: "2px",
              color: "#888888",
              textTransform: "uppercase",
            }}
          >
            Buraydah, Qassim · Saudi Arabia
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Cormorant Garamond",
          data: cormorantData,
          style: "normal",
          weight: 300,
        },
      ],
    }
  );
}
