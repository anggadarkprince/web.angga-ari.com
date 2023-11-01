import './globals.css'
import styles from './page.module.css';
import '@iconscout/unicons/css/line.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import React from "react";
import {ThemeContextProvider} from "@/app/context/ThemeContext";
import {cookies} from "next/headers";
import {clsx} from "clsx";
import {Sidebar} from "@/app/(manage)/manage/components/Layouts/Sidebar";
import {Header} from "@/app/(manage)/manage/components/Layouts/Header";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: "swap",
  variable: '--body-font',
})

export const metadata: Metadata = {
  title: 'Manage - Angga Ari Wijaya',
  description: 'Angga Ari Wijaya\'s personal website',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  return (
    <html lang="en">
    <ThemeContextProvider theme={theme?.value}>
      <body className={clsx(poppins.className, theme?.value === 'dark' && 'dark-theme')}>
        <main className={styles.main}>
          <Sidebar/>
          <section className="content-wrapper">
            <Header/>
            <div className="content">
              {children}
            </div>
          </section>
        </main>
      </body>
    </ThemeContextProvider>
    </html>
  )
}
