import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { integral_cf, satoshi } from "@/lib/fonts";
import { Inter, Sen } from "next/font/google";
import { Toaster } from "sonner";
import ProviderLayout from "@/store/providerLayout";

export const metadata: Metadata = {
  title: "Lanes",
  description: "Build Your Style Today",
};

const sen = Sen({ subsets: ["latin"], variable: "--sen" });
const InterFont = Inter({ subsets: ["latin"], variable: "--Inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-satoshi",
          satoshi.variable,
          integral_cf.variable,
          InterFont.variable,
        )}
      >
        <ProviderLayout>{children}</ProviderLayout>
        <Toaster />
      </body>
    </html>
  );
}
