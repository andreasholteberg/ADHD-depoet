import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Depotet",
  description: "Phase 1 prosjektoppsett for Depotet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
