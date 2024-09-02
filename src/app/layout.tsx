import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { integral_cf, satoshi } from "@/lib/fonts";
import MainLayout from "@/layouts/main/layout";

export const metadata: Metadata = {
  title: "Lanes",
  description: "Build Your Style Today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("font-satoshi", satoshi.variable, integral_cf.variable)}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
