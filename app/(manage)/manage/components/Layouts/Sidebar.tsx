import React from "react";
import styles from './Sidebar.module.css';
import {clsx} from "clsx";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <a href="../index.html" className={styles.nav__logo}>
        <img src="../assets/img/favicon.png" alt="Logo" className="mr-0-5"/>
        <strong>Dash</strong>Board
      </a>
      <a href="../index.html" className={styles.nav__logoMini}>
        <img src="../assets/img/favicon.png" alt="Logo"/>
      </a>
      <div className={styles.nav__user}>
        <img src="../assets/img/profile.jpg" alt="Profile" className={styles.nav__avatar}/>
        <div className={clsx(styles.nav__userInfo, 'truncate')}>
          <h4 className={styles.nav__profileName}>Angga Ari Wijaya</h4>
          <p className={clsx(styles.nav__profileEmail, 'truncate')}>angga.aw92@gmail.com</p>
        </div>
      </div>
      <ul className={styles.nav__list}>
        <li className={styles.nav__section}>Main Menu</li>
        <li className={styles.nav__item}>
          <Link href="dashboard.html" className={clsx(styles.nav__link, styles.active)}>
            <i className={clsx(styles.nav__icon, 'uil-estate')}></i> <span className={styles.nav__text}>Home</span>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link href="about.html" className={clsx(styles.nav__link)}>
            <i className={clsx(styles.nav__icon, 'uil-user')}></i> <span className={styles.nav__text}>About</span>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link href="expertises.html" className={clsx(styles.nav__link)}>
            <i className={clsx(styles.nav__icon, 'uil-file-alt')}></i> <span className={styles.nav__text}>Expertises</span>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link href="experiences.html" className={clsx(styles.nav__link)}>
            <i className={clsx(styles.nav__icon, 'uil-bag')}></i> <span className={styles.nav__text}>Experiences</span>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link href="showcases.html" className={clsx(styles.nav__link)}>
            <i className={clsx(styles.nav__icon, 'uil-image-plus')}></i> <span className={styles.nav__text}>Showcases</span>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link href="messages.html" className={clsx(styles.nav__link)}>
            <i className={clsx(styles.nav__icon, 'uil-at')}></i> <span className={styles.nav__text}>Messages</span>
          </Link>
        </li>
        <li className={styles.nav__section}>Preferences</li>
        <li className={styles.nav__item}>
          <a href="#sub-setting" className={clsx(styles.nav__link, 'action-toggle collapsed')}>
            <i className={clsx(styles.nav__icon, 'uil-setting')}></i>
            <span className={styles.nav__text}>Settings</span>
            <i className="nav__arrow"></i>
          </a>
          <ul className={clsx(styles.nav__list, 'collapse')} id="sub-setting">
            <li className={styles.nav__item}>
              <Link href="/manage/setting-general.html" className={styles.nav__link}>
                <i className={clsx(styles.nav__icon, 'uil-web-grid')}></i> <span className={styles.nav__text}>General</span>
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/manage/setting-account.html" className={styles.nav__link}>
                <i className={clsx(styles.nav__icon, 'uil-user-square')}></i> <span className={styles.nav__text}>Account</span>
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link href="/manage/setting-password.html" className={styles.nav__link}>
                <i className={clsx(styles.nav__icon, 'uil-lock')}></i> <span className={styles.nav__text}>Password</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={styles.nav__item}>
          <a href="login.html" className={styles.nav__link}>
            <i className={clsx(styles.nav__icon, 'uil-signout color-aggressive')}></i>
            <span className={clsx(styles.nav__text, 'color-aggressive')}>Sign Out</span>
          </a>
        </li>
      </ul>
      <div className={clsx(styles.nav__footer, 'mt-auto')}>
        <button className="button button__white button__small" id="theme-button">
          <i className="uil-moon"></i><span className="nav__text ml-0-5">Dark Theme</span>
        </button>
        <div className={styles.nav__copyright}>
          <small className="mt-1 display-block line-height-1">&copy; 2023 all rights reserved</small>
          <small className="text-fade text-smaller">Version 1.0 - builds 20230811</small>
        </div>
      </div>
    </nav>
  )
}
