import type { Metadata } from "next";

// metadataBase makes all relative og:image paths resolve to an absolute URL.
// Set NEXT_PUBLIC_SITE_URL in .env.local (e.g. https://darsaif.com) before launch.
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
