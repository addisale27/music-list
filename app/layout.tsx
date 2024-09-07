import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google"; // Fix this line
import NavBar from "./components/NavBar";

const poppin = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Music lidt App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppin.className}>
        <div>
          <NavBar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}