import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { integral_cf, satoshi } from "@/lib/fonts";
import { Sen } from "next/font/google";
import MainLayout from "@/layouts/main/layout";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Lanes",
  description: "Build Your Style Today",
};

const sen = Sen({ subsets: ["latin"],
  variable:"--sen"
 });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("font-satoshi", satoshi.variable, integral_cf.variable,sen.variable)}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
