import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="[&_h1]:font-thin">
      <head>{/* <script src="https://cdn.websegment.com"></script> */}</head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}