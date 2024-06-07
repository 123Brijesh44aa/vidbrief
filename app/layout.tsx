import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import React from "react";


const poppins = Poppins(
	{
		subsets: ["latin"],
		weight: ["600"]
	}
);


export const metadata: Metadata = {
  title: "VidBrief",
  description: "Transform YouTube videos into concise summaries and insightful overviews with our innovative analysis app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={poppins.className}>
    <main className="py-10 px-12">
	    {children}
	</main>
	</body>
    </html>
  );
}
