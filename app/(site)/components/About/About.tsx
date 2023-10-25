import styles from './About.module.css';
import {clsx} from "clsx";
import parse from 'html-react-parser';
import {ForwardedRef, forwardRef} from "react";
import {ProfileType} from "@/app/types";

interface AboutProps {
    profile: ProfileType | null
}
export const About = forwardRef(({profile}: AboutProps, ref: ForwardedRef<HTMLElement>) => {
    return (
        <section className="section" id="about" ref={ref}>
            <h2 className="section__title">About Me</h2>
            <h3 className="section__subtitle">Welcome to my world</h3>
            <div className={clsx(styles.about__container, 'container grid')}>
                <ul className={styles.about__info}>
                    <li className={styles.about__infoItem}>
                        <p className={styles.about__infoLabel}>Name</p>
                        <h3 className={styles.about__infoValue}>{profile?.fullName}</h3>
                    </li>
                    <li className={styles.about__infoItem}>
                        <p className={styles.about__infoLabel}>Location</p>
                        <h3 className={styles.about__infoValue}>{profile?.location}</h3>
                    </li>
                    <li className={styles.about__infoItem}>
                        <p className={styles.about__infoLabel}>Email Address</p>
                        <a href={`mailto:${profile?.emailAddress}`} className={styles.about__infoValue}>
                            {profile?.emailAddress} <i className="uil-external-link-alt color-primary"></i>
                        </a>
                    </li>
                    <li className={styles.about__infoItem}>
                        <p className={styles.about__infoLabel}>Website</p>
                        <a href={profile?.website} className={styles.about__infoValue}>
                            {profile?.website} <i className="uil-external-link-alt color-primary"></i>
                        </a>
                    </li>
                </ul>
                <div>
                    <p className={styles.about__description}>
                        {parse(profile?.about || '')}
                    </p>
                    <div className={styles.about__stats}>
                        <div>
                            <p className={styles.about__infoTitle}>{profile?.experienceYears}+</p>
                            <p className={styles.about__infoName}>Years <br/> experience</p>
                        </div>
                        <div>
                            <p className={styles.about__infoTitle}>{profile?.completedProjects}+</p>
                            <p className={styles.about__infoName}>Completed <br/> project</p>
                        </div>
                        <div>
                            <p className={styles.about__infoTitle}>{profile?.learningHours}+</p>
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
});
About.displayName = 'About';
