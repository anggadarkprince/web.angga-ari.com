import styles from './About.module.css';
import {clsx} from "clsx";
import Link from "next/link";

export const About = () => {
    return (
        <section className="section" id="about">
            <h2 className="section__title">About Me</h2>
            <h3 className="section__subtitle">Welcome to my world</h3>
            <div className={clsx(styles.about__container, 'container grid')}>
                <ul className={styles.about__info}>
                    <li className={styles.about__infoItem}>
                        <p className={styles.about__infoLabel}>Name</p>
                        <h3 className={styles.about__infoValue}>Angga Ari Wijaya</h3>
                    </li>
                    <li className={styles.about__infoItem}>
                        <p className={styles.about__infoLabel}>Location</p>
                        <h3 className={styles.about__infoValue}>Surabaya, Indonesia</h3>
                    </li>
                    <li className={styles.about__infoItem}>
                        <p className={styles.about__infoLabel}>Email Address</p>
                        <a href="mailto:angga.aw92@gmail.com" className={styles.about__infoValue}>
                            angga.aw92@gmail.com <i className="uil-external-link-alt color-primary"></i>
                        </a>
                    </li>
                    <li className={styles.about__infoItem}>
                        <p className={styles.about__infoLabel}>Website</p>
                        <Link href="https://angga-ari.com" className={styles.about__infoValue}>
                            https://angga-ari.com <i className="uil-external-link-alt color-primary"></i>
                        </Link>
                    </li>
                </ul>
                <div>
                    <p className={styles.about__description}>
                        With several years of experience in the field, I possess a deep understanding of <strong>software
                        development</strong>, architecture, and design. My expertise includes <strong>full-stack development</strong>, object-oriented programming, and
                        database management.
                    </p>
                    <div className={styles.about__description}>
                        I am always eager to explore new technologies and techniques to enhance my skills and
                        <strong>stay up-to-date</strong> with the latest trends in the industry.
                    </div>
                    <div className={styles.about__stats}>
                        <div>
                            <p className={styles.about__infoTitle}>06+</p>
                            <p className={styles.about__infoName}>Years <br/> experience</p>
                        </div>
                        <div>
                            <p className={styles.about__infoTitle}>20+</p>
                            <p className={styles.about__infoName}>Completed <br/> project</p>
                        </div>
                        <div>
                            <p className={styles.about__infoTitle}>10+</p>
                            <p className={styles.about__infoName}>Hours <br/> learning / week</p>
                        </div>
                    </div>
                    <div className={styles.about__buttons}>
                        <a href="#" className="button button--flex">
                            <i className="uil-file-download mr-0-5"></i> Download CV
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
