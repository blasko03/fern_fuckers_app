import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { type ReactElement } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FernFuckersApp',
  description: ''
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
