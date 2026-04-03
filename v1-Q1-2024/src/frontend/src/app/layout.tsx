import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import { Metadata } from "next";
import "../styles/app.css";
import { Toaster } from "sonner";

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
          <main className="container mx-auto">{children}</main>
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
