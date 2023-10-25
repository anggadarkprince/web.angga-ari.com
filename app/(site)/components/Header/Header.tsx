"use client"

import styles from './Header.module.css';
import {clsx} from "clsx";
import Link from "next/link";
import {RefObject, useEffect, useState} from "react";
import {useTheme} from "@/app/context/ThemeContext";
import {ProfileType} from "@/app/types";

interface HeaderProps {
    sections: RefObject<HTMLElement>[],
    profile: ProfileType | null
}
export const Header = ({sections, profile}: HeaderProps) => {
    const {theme, setTheme} = useTheme();
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
                            <Link href="#home" className={clsx(styles.nav__link, menuActive === 'home' && styles.activeLink)} onClick={() => setIsOpen(false)}>
                                <i className={clsx([styles.nav__icon, 'uil-estate'])}></i>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="#about" className={clsx(styles.nav__link, menuActive === 'about' && styles.activeLink)} onClick={() => setIsOpen(false)}>
                                <i className={clsx(styles.nav__icon, 'uil-user')}></i>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="#expertise" className={clsx(styles.nav__link, menuActive === 'expertise' && styles.activeLink)} onClick={() => setIsOpen(false)}>
                                <i className={clsx(styles.nav__icon, 'uil-file-alt')}></i>
                                Expertise
                            </Link>
                        </li>
                        <li>
                            <Link href="#experience" className={clsx(styles.nav__link, menuActive === 'experience' && styles.activeLink)} onClick={() => setIsOpen(false)}>
                                <i className={clsx(styles.nav__icon, 'uil-bag')}></i>
                                Experiences
                            </Link>
                        </li>
                        <li>
                            <Link href="#showcase" className={clsx(styles.nav__link, menuActive === 'showcase' && styles.activeLink)} onClick={() => setIsOpen(false)}>
                                <i className={clsx(styles.nav__icon, 'uil-image-plus')}></i>
                                Showcase
                            </Link>
                        </li>
                        <li>
                            <Link href="#contact" className={clsx(styles.nav__link, menuActive === 'contact' && styles.activeLink)} onClick={() => setIsOpen(false)}>
                                <i className={clsx(styles.nav__icon, 'uil-at')}></i>
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <button type="button" className={styles.nav__close} onClick={() => setIsOpen(false)}>
                        <i className="uil-times"></i>
                    </button>
                </div>
                <div className={styles.nav__controls}>
                    <i className={clsx(styles.nav__actionLink, styles.changeTheme, theme == 'light' ? 'uil-moon' : 'uil-sun')} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark', true)}></i>
                    {profile?.githubUrl && (
                        <a href={profile?.githubUrl} className={styles.nav__actionLink} target="_blank">
                            <i className="uil-github"></i>
                        </a>
                    )}
                    <button type="button" className={styles.nav__toggle} onClick={() => setIsOpen(!isOpen)}>
                        <i className="uil-apps"></i>
                    </button>
                </div>
            </div>
        </header>
    );
}
