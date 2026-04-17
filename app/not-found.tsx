import Link from "next/link";

// Root-level fallback — catches routes outside the /[locale] segment.
// No locale context available here, so English only.
export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0a0a0a", color: "#f0f0f0", fontFamily: "sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 1.5rem",
          }}
        >
          <p style={{ fontSize: "8rem", lineHeight: 1, color: "rgba(240,240,240,0.08)", margin: "0 0 2rem" }}>
            404
          </p>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 400, margin: "0 0 1rem" }}>
            Page Not Found
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#888", margin: "0 0 3rem" }}>
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/en"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#f0f0f0",
              border: "1px solid #222",
              padding: "1rem 2rem",
              textDecoration: "none",
            }}
          >
            Back to Homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
