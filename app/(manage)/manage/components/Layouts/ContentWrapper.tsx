"use client"

import {Sidebar} from "@/app/(manage)/manage/components/Layouts/Sidebar";
import styles from "@/app/(manage)/manage/page.module.css";
import {Header} from "@/app/(manage)/manage/components/Layouts/Header";
import {Footer} from "@/app/(manage)/manage/components/Layouts/Footer";
import React, {PropsWithChildren, useState} from "react";
import {setSidebarCollapseCookie} from "@/app/actions/cookies";

export const ContentWrapper = ({sidebarCollapse = false, children}: PropsWithChildren<{sidebarCollapse?: boolean}>) => {
  const [isCollapse, setIsCollapse] = useState(sidebarCollapse);

  const onSidebarCollapse = async () => {
    setIsCollapse(!isCollapse);
    await setSidebarCollapseCookie(!isCollapse);
  }

  return (
    <>
      <Sidebar collapse={isCollapse} />
      <section className={styles.contentWrapper}>
        <Header onSidebarCollapse={onSidebarCollapse} />
        <div className={styles.content}>
          <div className={styles.pageContent}>
            {children}
          </div>
          <Footer/>
        </div>
      </section>
    </>
  )
}
