import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stepcable.com"),
  title: "Step Cables",
  description: "Step Cables website",
  icons: {
    icon: "/new-logo.png",
    shortcut: "/new-logo.png",
    apple: "/new-logo.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
