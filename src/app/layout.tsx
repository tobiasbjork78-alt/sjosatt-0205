import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yatsy Digital Protokoll',
  description: 'Digital poängräkning för Yatsy - ersätt papper och penna!',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#3b82f6',
  applicationName: 'Yatsy Digital Protokoll',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Yatsy',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    title: 'Yatsy Digital Protokoll',
    description: 'Digital poängräkning för Yatsy - ersätt papper och penna!',
    siteName: 'Yatsy Digital Protokoll',
  },
  twitter: {
    card: 'summary',
    title: 'Yatsy Digital Protokoll',
    description: 'Digital poängräkning för Yatsy - ersätt papper och penna!',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Yatsy" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}