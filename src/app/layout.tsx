import React from 'react'
import Script from 'next/script'
import { Metadata } from 'next'
import { Jost } from 'next/font/google'

import { Footer } from './_components/Footer'
import { Header } from './_components/Header'
import { HeaderBanner } from './_components/Banners/HeaderBanner'
import { ScrollToTop } from './_components/Buttons/ScrollToTopButton'
import { Providers } from './_providers'
import { InitTheme } from './_providers/Theme/InitTheme'
import { mergeOpenGraph } from './_utilities/mergeOpenGraph'
import ToastNotification from './_components/NotificationToast'

import './_css/app.scss'
import AgeVerificationModal from './_components/ui-components/AgeVerificationModal'

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jost',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          />
          <Script id="truendoAutoBlock" type="text/javascript" src="https://cdn.priv.center/pc/truendo_cmp.pid.js" data-siteid="422a7fd1-9704-4732-bc89-9b407af3dc43"></Script>
          <Script id="google-analytics">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID});
            `}
          </Script> */}
        </head>
      <body className={jost.variable}>
        <Providers>
          <ToastNotification />
          <AgeVerificationModal />
          <HeaderBanner />
          {/* @ts-expect-error */}
          <Header />
          <main className="main">{children}</main>
          {/* @ts-expect-error */}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  twitter: {
    card: 'summary_large_image',
    creator: '@sgdesign',
  },
  openGraph: mergeOpenGraph(),
}
