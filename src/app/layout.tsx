import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevNotes",
  description: "Organize your notes with DevNotes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}