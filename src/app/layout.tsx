import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yatsy Digital Protokoll',
  description: 'Digital poängräkning för Yatsy - ersätt papper och penna!',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}