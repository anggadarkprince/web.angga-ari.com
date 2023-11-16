import styles from './Header.module.css';
import React from "react";
import {clsx} from "clsx";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownDivider, DropdownItem} from "@/app/components/Dropdowns";
import {clearAccessToken} from "@/app/actions/cookies";
import {useRouter} from "next/navigation";
import Image from "next/image";

export const Header = ({onSidebarCollapse}: {onSidebarCollapse: () => void}) => {
  const router = useRouter();

  const onSignOut = async () => {
    await clearAccessToken();
    router.push('/login');
  }

  return (
    <header className={styles.header}>
      <button type="button" className={styles.button__menuToggle} onClick={onSidebarCollapse}>
        <i className="uil-bars"></i>
      </button>
      <ul className={styles.header__nav}>
        <li>
          <a href="#" className={styles.header__navLink}>
            <i className={clsx(styles.header__navIcon, 'uil-search')}></i>
          </a>
        </li>
        <li>
          <a href="#" className={styles.header__navLink}>
            <i className={clsx(styles.header__navIcon, 'uil-inbox')}></i>
          </a>
        </li>
        <li>
          <Dropdown className={styles.notification__dropdown}>
            <DropdownToggle className={styles.header__navLink}>
              <i className={clsx(styles.header__navIcon, 'uil-comment-alt-dots')}></i>
            </DropdownToggle>
            <DropdownMenu positionRight={true} className={clsx(styles.notification__dropdownMenu, 'overflow-hidden')}>
              <div className="display-flex flex-align-center flex-justify-between p-1 shadow position-relative">
                <h4>Notifications</h4>
                <a href="#">Mark all as read</a>
              </div>
              <div className={styles.notification__dropdownList}>
                <DropdownItem href={'#'} className={styles.notification__dropdownItem}>
                  <p><strong>Angga</strong> send a message about project <strong>Web Development</strong></p>
                  <small className="text-fade">1 hour ago</small>
                </DropdownItem>
                <DropdownItem href={'#'} className={styles.notification__dropdownItem}>
                  <p><strong>Ari</strong> send a message about project <strong>Web Development</strong></p>
                  <small className="text-fade">1 hour ago</small>
                </DropdownItem>
              </div>
            </DropdownMenu>
          </Dropdown>
        </li>
        <li>
          <Dropdown>
            <DropdownToggle className={clsx(styles.header__navLink, 'pr-0')}>
              <Image src="/assets/img/profile.jpg" width={25} height={25} alt="Profile" className={styles.header__navAvatar}/>
              My Account
            </DropdownToggle>
            <DropdownMenu positionRight={true}>
              <DropdownItem href="/manage/setting/account" title="My Account" icon="uil-user"/>
              <DropdownItem href="/manage/setting/password" title="Change Password" icon="uil-lock"/>
              <DropdownDivider/>
              <DropdownItem title="Sign Out" icon="uil-signout" onClick={onSignOut}/>
            </DropdownMenu>
          </Dropdown>
        </li>
      </ul>
    </header>
  )
}
