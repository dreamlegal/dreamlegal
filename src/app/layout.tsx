
import Script from "next/script"
import "@/app/globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ClarityCity } from "@/utils/customFont"
import MainLayout from "@/components/MainLayout"
import { Providers } from "@/app/providers"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "DreamLegal",
  description: "Your only legal directory for Legal solutions",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>DreamLegal</title>

        {/* Termly Cookie Consent Script */}
        <Script
          id="termly-cookie-banner"
          strategy="afterInteractive"
          src="https://app.termly.io/embed.min.js"
          data-website-uuid="6fdf5dcc-8a7a-4b57-b5fa-61a128e331d7"
        />

        {/* Google Tag Manager - Head */}
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
      </head>

      <body className={ClarityCity.variable}>
        {/* Google Tag Manager - Body (noscript) */}
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
