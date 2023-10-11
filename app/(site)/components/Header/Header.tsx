import styles from './Header.module.css';
import {clsx} from "clsx";

export const Header = () => {
    return (
        <header id="header" className={clsx([styles.header, styles.scrollHeader])}>
            <div className={clsx([styles.nav, 'container'])}>
                <a href="/" className={styles.nav__logo}>
                    Angga Ari W.
                </a>
                <div id="nav-menu" className={styles.nav__menu}>
                    <ul className={clsx([styles.nav__list, 'grid'])}>
                        <li>
                            <a href="#home" className={clsx(styles.nav__link, styles.activeLink)}>
                                <i className={clsx([styles.nav__icon, 'uil-estate'])}></i>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#about" className={styles.nav__link}>
                                <i className={clsx(styles.nav__icon, 'uil-user')}></i>
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#expertise" className={styles.nav__link}>
                                <i className={clsx(styles.nav__icon, 'uil-file-alt')}></i>
                                Expertise
                            </a>
                        </li>
                        <li>
                            <a href="#experience" className={styles.nav__link}>
                                <i className={clsx(styles.nav__icon, 'uil-bag')}></i>
                                Experiences
                            </a>
                        </li>
                        <li>
                            <a href="#showcase" className={styles.nav__link}>
                                <i className={clsx(styles.nav__icon, 'uil-image-plus')}></i>
                                Showcase
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className={styles.nav__link}>
                                <i className={clsx(styles.nav__icon, 'uil-at')}></i>
                                Contact
                            </a>
                        </li>
                    </ul>
                    <i className={clsx(styles.nav__close, 'uil-times')} id="nav-close"></i>
                </div>
                <div className={styles.nav__controls}>
                    <i className={clsx(styles.nav__actionLink, styles.changeTheme, 'uil-moon')} id="theme-button"></i>
                    <a href="https://github.com/anggadarkprince/anggadarkprince.github.io" className={styles.nav__actionLink} target="_blank">
                        <i className="uil-github"></i>
                    </a>
                    <div className={styles.nav__toggle} id="nav-toggle">
                        <i className="uil-apps"></i>
                    </div>
                </div>
            </div>
        </header>
    );
}
