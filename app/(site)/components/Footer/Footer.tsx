import styles from './Footer.module.css';
import Link from "next/link";
import {Social} from "@/app/(site)/components/Links/Social";
import {ProfileType} from "@/app/types";

interface FooterProps {
    profile: ProfileType | null
}
export const Footer = ({profile}: FooterProps) => {
    return (
        <div className={styles.footer}>
            <div className="container text-center">
                <h1 className={styles.footer__name}>Follow me on</h1>
                <ul className={styles.footer__social}>
                    {profile?.githubUrl && (
                      <li>
                          <Social type="github" url="https://github.com/anggadarkprince" />
                      </li>
                    )}
                    {profile?.twitterUrl && (
                      <li>
                          <Social type="twitter" url="https://twitter.com/_anggaari" />
                      </li>
                    )}
                    {profile?.instagramUrl && (
                      <li>
                          <Social type="instagram" url="https://instagram.com/_angga.ari" />
                      </li>
                    )}
                    {profile?.linkedinUrl && (
                      <li>
                          <Social type="linkedin" url="https://linkedin.com/in/angga-ari-wijaya" />
                      </li>
                    )}
                </ul>

                <h2 className={styles.footer__email}>{profile?.emailAddress}</h2>

                <ul className={styles.footer__menu}>
                    <li><Link href="#home">Home</Link></li>
                    <li><Link href="#about">About Us</Link></li>
                    <li><Link href="#expertise">Expertise</Link></li>
                    <li><Link href="#experience">Experience</Link></li>
                    <li><Link href="#showcase">Showcase</Link></li>
                    <li><Link href="#contact">Contact</Link></li>
                </ul>

                <p className={styles.footer__copyright}>
                    &copy; Designed and Developed by <strong className="color-primary">{profile?.fullName}</strong>. All right reserved
                </p>
            </div>
        </div>
    );
}
