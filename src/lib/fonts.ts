import localFont from "next/font/local";

export const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi/Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Satoshi/Bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-satoshi",
});

export const integral_cf = localFont({
  src: [
    {
      path: "../../public/fonts/Integral-cf/Regular.otf",
      weight: "400",
    },
  ],
  variable: "--font-integral-cf",
});
