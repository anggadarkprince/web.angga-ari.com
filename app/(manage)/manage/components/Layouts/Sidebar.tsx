"use client"

import React from "react";
import styles from './Sidebar.module.css';
import {clsx} from "clsx";
import Link from "next/link";
import {Button} from "@/app/components/Buttons";
import {useTheme} from "@/app/context/ThemeContext";
import {usePathname, useRouter} from "next/navigation";
import {clearAccessToken} from "@/app/actions/cookies";
import {Collapse, CollapseItem, CollapseToggle} from "@/app/components/Collapse";
import Image from "next/image";

export const Sidebar = ({collapse = false}: {collapse: boolean}) => {
  const {theme, setTheme} = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const onSignOut = async () => {
    await clearAccessToken();
    router.push('/login');
  }

  return (
    <nav className={clsx(styles.sidebar, collapse && styles.sidebar__collapse)}>
      <a href="../index.html" className={styles.nav__logo}>
        <Image src="/assets/img/favicon.png" width={30} height={30} alt="Logo" className="mr-0-5"/>
        <strong>Dash</strong>Board
      </a>
      <a href="/manage" className={styles.nav__logoMini}>
        <Image src="/assets/img/favicon.png" width={35} height={35} alt="Logo"/>
      </a>
      <div className={styles.nav__user}>
        <Image src="/assets/img/profile.jpg" width={36} height={36} alt="Profile" className={styles.nav__avatar}/>
        <div className={clsx(styles.nav__userInfo, 'truncate')}>
          <h4 className={styles.nav__profileName}>Angga Ari Wijaya</h4>
          <p className={clsx(styles.nav__profileEmail, 'truncate')}>angga.aw92@gmail.com</p>
        </div>
      </div>
      <ul className={styles.nav__list}>
        <li className={styles.nav__section}>Main Menu</li>
        <li className={styles.nav__item}>
          <Link href="/manage/dashboard" className={clsx(styles.nav__link, pathname.startsWith('/manage/dashboard') && styles.active)}>
            <i className={clsx(styles.nav__icon, 'uil-estate')}></i> <span className={styles.nav__text}>Home</span>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link href="/manage/about" className={clsx(styles.nav__link, pathname.startsWith('/manage/about') && styles.active)}>
            <i className={clsx(styles.nav__icon, 'uil-user')}></i> <span className={styles.nav__text}>About</span>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link href="/manage/expertises" className={clsx(styles.nav__link, pathname.startsWith('/manage/expertises') && styles.active)}>
            <i className={clsx(styles.nav__icon, 'uil-file-alt')}></i> <span className={styles.nav__text}>Expertises</span>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link href="/manage/experiences" className={clsx(styles.nav__link, pathname.startsWith('/manage/experiences') && styles.active)}>
            <i className={clsx(styles.nav__icon, 'uil-bag')}></i> <span className={styles.nav__text}>Experiences</span>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link href="/manage/showcases" className={clsx(styles.nav__link, pathname.startsWith('/manage/showcases') && styles.active)}>
            <i className={clsx(styles.nav__icon, 'uil-image-plus')}></i> <span className={styles.nav__text}>Showcases</span>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link href="/manage/messages" className={clsx(styles.nav__link, pathname.startsWith('/manage/messages') && styles.active)}>
            <i className={clsx(styles.nav__icon, 'uil-at')}></i> <span className={styles.nav__text}>Messages</span>
          </Link>
        </li>
        <li className={styles.nav__section}>Preferences</li>
        <li className={styles.nav__item}>
          <Collapse collapsed={!pathname.startsWith('/manage/setting')}>
            <CollapseToggle>
              {isCollapse => (
                <a href="#" className={clsx(styles.nav__link, pathname.startsWith('/manage/setting') && styles.active, isCollapse && styles.collapsed)}>
                  <i className={clsx(styles.nav__icon, 'uil-setting')}></i>
                  <span className={styles.nav__text}>Settings</span>
                  <i className={styles.nav__arrow}></i>
                </a>
              )}
            </CollapseToggle>
            <CollapseItem>
              <ul className={clsx(styles.nav__list)}>
                <li className={styles.nav__item}>
                  <Link href="/manage/setting/general" className={clsx(styles.nav__link, pathname.startsWith('/manage/setting/general') && styles.active)}>
                    <i className={clsx(styles.nav__icon, 'uil-web-grid')}></i> <span className={styles.nav__text}>General</span>
                  </Link>
                </li>
                <li className={styles.nav__item}>
                  <Link href="/manage/setting/account" className={clsx(styles.nav__link, pathname.startsWith('/manage/setting/account') && styles.active)}>
                    <i className={clsx(styles.nav__icon, 'uil-user-square')}></i> <span className={styles.nav__text}>Account</span>
                  </Link>
                </li>
                <li className={styles.nav__item}>
                  <Link href="/manage/setting/password" className={clsx(styles.nav__link, pathname.startsWith('/manage/setting/password') && styles.active)}>
                    <i className={clsx(styles.nav__icon, 'uil-lock')}></i> <span className={styles.nav__text}>Password</span>
                  </Link>
                </li>
              </ul>
            </CollapseItem>
          </Collapse>
        </li>
        <li className={styles.nav__item}>
          <button type={'button'} onClick={onSignOut} className={styles.nav__link}>
            <i className={clsx(styles.nav__icon, 'uil-signout color-aggressive')}></i>
            <span className={clsx(styles.nav__text, 'color-aggressive')}>Sign Out</span>
          </button>
        </li>
      </ul>
      <div className={clsx(styles.nav__footer, 'mt-auto')}>
        <Button variant={"white"} size={"small"} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <i className={theme == 'light' ? 'uil-moon' : 'uil-sun'}></i>
          <span className="nav__text ml-0-5">
            {theme == 'light' ? 'Dark' : 'Light'} Theme
          </span>
        </Button>
        <div className={styles.nav__copyright}>
          <small className="mt-1 display-block line-height-1">&copy; {(new Date()).getFullYear()} all rights reserved</small>
          <small className="text-fade text-smaller">Version 1.0 - builds 20230811</small>
        </div>
      </div>
    </nav>
  )
}
