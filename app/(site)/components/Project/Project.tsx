import styles from './Project.module.css';
import {clsx} from "clsx";

export const Project = () => {
    return (
        <section className="section">
            <div className={clsx(styles.project__container, 'container grid')}>
                <div>
                    <h3 className={styles.project__title}>Have Any Idea in Mind?</h3>
                    <p className={styles.project__description}>
                        You have idea to build something great? let me know and we can discuss it.
                    </p>
                </div>
                <div>
                    <a href="#contact" type="submit" className="button button--white">
                        Contact Me Now
                    </a>
                </div>
            </div>
        </section>
    );
}
