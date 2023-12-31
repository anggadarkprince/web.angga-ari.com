import './globals.css'
import '@iconscout/unicons/css/line.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import React from "react";
import {ThemeContextProvider} from "@/app/context/ThemeContext";
import {cookies} from "next/headers";
import {clsx} from "clsx";

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
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  return (
    <html lang="en">
      <ThemeContextProvider theme={theme?.value}>
        <body className={clsx(poppins.className, theme?.value === 'dark' && 'dark-theme')}>
          {children}
        </body>
      </ThemeContextProvider>
    </html>
  )
}
