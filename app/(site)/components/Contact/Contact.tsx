import styles from './Contact.module.css';
import {clsx} from "clsx";
import {ForwardedRef, forwardRef} from "react";
import {ProfileType} from "@/app/types";

interface ContactProps {
    profile: ProfileType | null
}
export const Contact = forwardRef(({profile}: ContactProps, ref: ForwardedRef<HTMLElement>) => {
    return (
        <section className="section" id="contact" ref={ref}>
            <h1 className="section__title">Contact Me</h1>
            <h3 className="section__subtitle">Don&apos;t hesitate to get in touch</h3>

            <div className={clsx(styles.contact__container, 'container grid')}>
                <div className={styles.contact__informationWrapper}>
                    <div className={styles.contact__information}>
                        <i className={clsx(styles.contact__icon, 'uil-phone')}></i>
                        <div>
                            <h3 className={styles.contact__title}>Call Me</h3>
                            <span className={styles.contact__subtitle}>{profile?.phone}</span>
                        </div>
                    </div>
                    <div className={styles.contact__information}>
                        <i className={clsx(styles.contact__icon, 'uil-envelope')}></i>
                        <div>
                            <h3 className={styles.contact__title}>Email</h3>
                            <span className={styles.contact__subtitle}>{profile?.emailAddress}</span>
                        </div>
                    </div>
                    <div className={styles.contact__information}>
                        <i className={clsx(styles.contact__icon, 'uil-map-marker')}></i>
                        <div>
                            <h3 className={styles.contact__title}>Location</h3>
                            <span className={styles.contact__subtitle}>{profile?.location}</span>
                        </div>
                    </div>
                    <div className={styles.contact__information}>
                        <i className={clsx(styles.contact__icon, 'uil-github-alt')}></i>
                        <div>
                            <h3 className={styles.contact__title}>Github</h3>
                            <span className={styles.contact__subtitle}>{profile?.githubUsername}</span>
                        </div>
                    </div>
                </div>

                <form className={clsx(styles.contact__form, 'grid')} id="contact-form">
                    <div className="alert" id="contact-form-message">
                        Your message successfully submitted
                    </div>
                    <fieldset>
                        <div className={clsx(styles.contact__inputs, 'grid')}>
                            <div className={styles.contact__inputGroup}>
                                <label htmlFor="input-name" className={styles.contact__label}>Name</label>
                                <input type="text" className={styles.contact__input} id="input-name" placeholder="Your full name" name="name" required maxLength={30} />
                            </div>
                            <div className={styles.contact__inputGroup}>
                                <label htmlFor="input-email" className={styles.contact__label}>Email</label>
                                <input type="email" className={styles.contact__input} id="input-email" placeholder="Email address" name="email" maxLength={50} />
                            </div>
                        </div>
                        <div className={styles.contact__inputGroup}>
                            <label htmlFor="input-project" className={styles.contact__label}>Project</label>
                            <input type="text" className={styles.contact__input} id="input-project" placeholder="Something you want to build" name="project" maxLength={50} />
                        </div>
                        <div className={styles.contact__inputGroup}>
                            <label htmlFor="input-message" className={styles.contact__label}>Message</label>
                            <textarea name="message" id="input-message" rows={7} className={styles.contact__input} placeholder="Tell me about it" required maxLength={1000}></textarea>
                        </div>
                        <div className={styles.contact__inputButton}>
                            <button type="submit" className="button">
                                Send Message
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </section>
    );
});
Contact.displayName = 'Contact';
