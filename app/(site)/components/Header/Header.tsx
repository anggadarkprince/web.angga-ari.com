"use client"

import styles from './Header.module.css';
import {clsx} from "clsx";
import Link from "next/link";
import {RefObject, useEffect, useState} from "react";

export const Header = ({sections}: {sections: RefObject<HTMLElement>[]}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuActive, setMenuActive] = useState('home');

    useEffect(() => {
        const handleScroll = (event: Event) => {
            const window = event.currentTarget as Window;
            const scrollY = window.scrollY;
            sections.forEach((ref) => {
                const sectionHeight = ref.current?.offsetHeight || 0;
                const sectionTop = (ref.current?.offsetTop || 0) - 50;
                const sectionId = ref.current?.getAttribute("id");

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    setMenuActive(sectionId || '');
                }
            });
            console.log(menuActive);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [menuActive, sections]);

    return (
        <header id="header" className={clsx([styles.header, styles.scrollHeader])}>
            <div className={clsx([styles.nav, 'container'])}>
                <a href="/" className={styles.nav__logo}>
                    Angga Ari W.
                </a>
                <div className={clsx(styles.nav__menu, isOpen && styles.showMenu)}>
                    <ul className={clsx([styles.nav__list, 'grid'])}>
                        <li>
                            <a href="#home" className={clsx(styles.nav__link, menuActive === 'home' && styles.activeLink)} onClick={() => setIsOpen(false)}>
                                <i className={clsx([styles.nav__icon, 'uil-estate'])}></i>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#about" className={clsx(styles.nav__link, menuActive === 'about' && styles.activeLink)} onClick={() => setIsOpen(false)}>
                                <i className={clsx(styles.nav__icon, 'uil-user')}></i>
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#expertise" className={clsx(styles.nav__link, menuActive === 'expertise' && styles.activeLink)} onClick={() => setIsOpen(false)}>
                                <i className={clsx(styles.nav__icon, 'uil-file-alt')}></i>
                                Expertise
                            </a>
                        </li>
                        <li>
                            <a href="#experience" className={clsx(styles.nav__link, menuActive === 'experience' && styles.activeLink)} onClick={() => setIsOpen(false)}>
                                <i className={clsx(styles.nav__icon, 'uil-bag')}></i>
                                Experiences
                            </a>
                        </li>
                        <li>
                            <a href="#showcase" className={clsx(styles.nav__link, menuActive === 'showcase' && styles.activeLink)} onClick={() => setIsOpen(false)}>
                                <i className={clsx(styles.nav__icon, 'uil-image-plus')}></i>
                                Showcase
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className={clsx(styles.nav__link, menuActive === 'contact' && styles.activeLink)} onClick={() => setIsOpen(false)}>
                                <i className={clsx(styles.nav__icon, 'uil-at')}></i>
                                Contact
                            </a>
                        </li>
                    </ul>
                    <button type="button" className={styles.nav__close} onClick={() => setIsOpen(false)}>
                        <i className="uil-times"></i>
                    </button>
                </div>
                <div className={styles.nav__controls}>
                    <i className={clsx(styles.nav__actionLink, styles.changeTheme, 'uil-moon')} id="theme-button"></i>
                    <Link href="https://github.com/anggadarkprince/anggadarkprince.github.io" className={styles.nav__actionLink} target="_blank">
                        <i className="uil-github"></i>
                    </Link>
                    <button type="button" className={styles.nav__toggle} onClick={() => setIsOpen(!isOpen)}>
                        <i className="uil-apps"></i>
                    </button>
                </div>
            </div>
        </header>
    );
}
