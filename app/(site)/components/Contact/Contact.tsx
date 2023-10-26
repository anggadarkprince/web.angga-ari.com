import styles from './Contact.module.css';
import {clsx} from "clsx";
import React, {ForwardedRef, forwardRef, useEffect, useState} from "react";
import {ApiError, ContactType, FormResult, ProfileType} from "@/app/types";
import {FormMessage} from "@/app/(site)/components/Form/FormMessage";

interface ContactProps {
    profile: ProfileType | null
}
export const Contact = forwardRef(({profile}: ContactProps, ref: ForwardedRef<HTMLElement>) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [project, setProject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<FormResult<ContactType> | null>(null);
    let controller: AbortController;

    useEffect(() => {
        return () => {
            if (controller) {
                controller.abort();
            }
        }
    }, []);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            setSubmitResult(null);
            controller = new AbortController();
            const response = await fetch('api/contacts', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, project, message}),
                signal: controller.signal
            });
            const result = await response.json();
            if (response.ok) {
                setSubmitResult({
                    type: 'success',
                    message: 'Your message successfully submitted',
                    response: result,
                });
                console.log('ok', result);
                setName('');
                setEmail('');
                setProject('');
                setMessage('');
            } else {
                setSubmitResult({
                    type: 'error',
                    message: 'Cannot submit message, try again later',
                    response: result,
                });
                console.error('not ok', result);
            }
        } catch (error) {
            setSubmitResult({
                type: 'error',
                message: 'Try again later',
            });
            console.error('error', error);
        } finally {
            setIsSubmitting(false);
        }
    }
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

                <form onSubmit={onSubmit} className={clsx(styles.contact__form, 'grid')} id="contact-form">
                    {!isSubmitting && submitResult && (
                      <div className={clsx('alert', `alert-${submitResult.type}`)} id="contact-form-message">
                          {submitResult.message}
                      </div>
                    )}
                    <fieldset>
                        <div className={clsx(styles.contact__inputs, 'grid')}>
                            <div className={styles.contact__inputGroup}>
                                <label htmlFor="input-name" className={styles.contact__label}>Name</label>
                                <input type="text" className={styles.contact__input} id="input-name" placeholder="Your full name"
                                       name="name" required maxLength={30} onChange={e => setName(e.target.value)} />
                                <FormMessage errors={submitResult?.response?.errors} errorKey={'name'} />
                            </div>
                            <div className={styles.contact__inputGroup}>
                                <label htmlFor="input-email" className={styles.contact__label}>Email</label>
                                <input type="email" className={styles.contact__input} id="input-email" placeholder="Email address"
                                       name="email" maxLength={50} onChange={e => setEmail(e.target.value)} />
                                <FormMessage errors={submitResult?.response?.errors} errorKey={'email'} />
                            </div>
                        </div>
                        <div className={styles.contact__inputGroup}>
                            <label htmlFor="input-project" className={styles.contact__label}>Project</label>
                            <input type="text" className={styles.contact__input} id="input-project" placeholder="Something you want to build"
                                   name="project" maxLength={50} onChange={e => setProject(e.target.value)} />
                            <FormMessage errors={submitResult?.response?.errors} errorKey={'project'} />
                        </div>
                        <div className={styles.contact__inputGroup}>
                            <label htmlFor="input-message" className={styles.contact__label}>Message</label>
                            <textarea name="message" id="input-message" rows={7} className={styles.contact__input} placeholder="Tell me about it"
                                      required maxLength={1000} onChange={e => setMessage(e.target.value)}></textarea>
                            <FormMessage errors={submitResult?.response?.errors} errorKey={'message'} />
                        </div>
                        <div className={styles.contact__inputButton}>
                            <button type="submit" className="button" disabled={isSubmitting}>
                                {isSubmitting ? 'Submit Message...' : 'Send Message'}
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </section>
    );
});
Contact.displayName = 'Contact';
