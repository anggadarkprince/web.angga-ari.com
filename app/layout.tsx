import './globals.css'
import '@iconscout/unicons/css/line.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import React from "react";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: "swap",
  variable: '--body-font',
})

export const metadata: Metadata = {
  title: 'Angga Ari Wijaya',
  description: 'Angga Ari Wijaya\'s personal website',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
