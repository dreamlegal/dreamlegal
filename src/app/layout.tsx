
import Script from "next/script"
import "@/app/globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ClarityCity } from "@/utils/customFont"
import MainLayout from "@/components/MainLayout"
import { Providers } from "@/app/providers"
import { Metadata } from "next"

// export const metadata: Metadata = {
//   title: {
//     default: "DreamLegal",
//     template: "%s | DreamLegal", // This makes dynamic titles like "About Us | DreamLegal"
//   },
//   description: "Premier Legal Tech Directory & Strategy Company is DreamLegal",
// }
// export const metadata: Metadata = {
//   title: {
//     default: "DreamLegal",
//     template: "%s | DreamLegal", // This makes dynamic titles like "About Us | DreamLegal"
//   },
//   description: "Premier Legal Tech Directory & Strategy Company is DreamLegal",
//   openGraph: {
//     images: [
//       {
//         url: "/icons/favicon.png", // ✅ path inside /public
//         width: 1200,
//         height: 630,
//         alt: "DreamLegal - Legal Tech Directory",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     images: ["/icons/favicon.png"], // ✅ same image for Twitter
//   },
// }
export const metadata: Metadata = {
  title: {
    default: "DreamLegal",
    template: "%s | DreamLegal",
  },
  description: "Premier Legal Tech Directory & Strategy Company is DreamLegal",
  openGraph: {
    images: [
      {
        url: "https://dreamlegal.in/icons/favicon.png", // ✅ full URL
        width: 1200,
        height: 630,
        alt: "DreamLegal - Legal Tech Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://dreamlegal.in/icons/favicon.png"], // ✅ full URL
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ClarityCity.variable}>
        {/* ✅ Termly Cookie Consent Script */}
        <Script
          id="termly-cookie-banner"
          strategy="afterInteractive"
          src="https://app.termly.io/embed.min.js"
          data-website-uuid="6fdf5dcc-8a7a-4b57-b5fa-61a128e331d7"
        />

        {/* ✅ Google Tag Manager - Script */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T9CMM2W');`
          }}
        />

        {/* ✅ Google Tag Manager - noscript fallback */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T9CMM2W"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}
        />

        <Providers>
          <MainLayout>
            {children}
          </MainLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
