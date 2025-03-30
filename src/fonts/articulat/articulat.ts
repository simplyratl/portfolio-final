import localFont from "next/font/local";

export const articulatCF = localFont({
  src: [
    {
      path: "./fonnts.com-Articulat_CF_Extra_Bold.otf",
      weight: "900",
    },
    {
      path: "./fonnts.com-Articulat_CF_Bold.otf",
      weight: "700",
    },
    {
      path: "./fonnts.com-Articulat_CF_Demi_Bold.otf",
      weight: "600",
    },
    {
      path: "./fonnts.com-Articulat_CF_Medium.otf",
      weight: "500",
    },
    {
      path: "./fonnts.com-Articulat_CF_Regular.otf",
      weight: "400",
    },
    {
      path: "./fonnts.com-Articulat_CF_Light.otf",
      weight: "300",
    },
    {
      path: "./fonnts.com-Articulat_CF_Extra_Light.otf",
      weight: "200",
    },
    {
      path: "./fonnts.com-Articulat_CF_Thin.otf",
      weight: "100",
    },
  ],
  variable: "--font-articulat-cf",
});
