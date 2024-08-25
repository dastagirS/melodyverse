import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MelodyVerse",
  description: "music streaming service",
};

export default function RootLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className="dark">{children}</body>
    </html>
  );
}
