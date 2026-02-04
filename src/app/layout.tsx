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
    startupImage: [
      '/apple-splash-2048-2732.png',
      '/apple-splash-1668-2224.png',
      '/apple-splash-1536-2048.png',
      '/apple-splash-1125-2436.png',
      '/apple-splash-1242-2688.png',
      '/apple-splash-828-1792.png',
      '/apple-splash-1170-2532.png',
      '/apple-splash-1284-2778.png',
    ],
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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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