import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import PokemonData from "../core/helpers/_DisplayApi";
import { Metadata } from "next";
import "../styles/app.css";
export const metadata: Metadata = {
  title: "Arcady divvjesschuif assesment",
  description: "here is a api do soo... Say no more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-arcady-bg">
          <Navbar />
          <div className="">
            <main className="container mx-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
