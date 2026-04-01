import type { Metadata } from 'next'
import '../styles/globals.css'
import AuthProvider from '@/components/shared/AuthProvider'

export const metadata: Metadata = {
  title: 'AURAWEAR',
  description: 'Premium eCommerce Apparels',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
