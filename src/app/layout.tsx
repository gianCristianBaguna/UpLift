import type { Metadata } from "next";
import { Montserrat, } from "next/font/google";
import "../styles/globals.css";

// Fonts
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Up Lift Foundation",
  description: "Join us in uplifting communities through service and sharing across our neighborhoods.",
  icons: {
    icon: "./public/uplift-logo-window.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}
