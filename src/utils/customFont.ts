import localFont from "next/font/local";

const ClarityCity = localFont({
  src: [
    {
      path: "../assets/font/ClarityCity-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/font/ClarityCity-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/font/ClarityCity-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clarity",
});

export { ClarityCity };
