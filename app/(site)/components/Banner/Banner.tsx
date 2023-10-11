import styles from './Banner.module.css';
import Image from "next/image";
import {clsx} from "clsx";

export const Banner = () => {
    return (
        <section className="section" id="home">
            <div className={clsx(styles.home__container, 'container grid')}>
                <Image src="/assets/img/profile.jpg" width={200} height={200} alt="Angga Ari Wijaya" className={clsx(styles.home__photo)} />
                    <div className={clsx(styles.home__description)}>
                        <div className={clsx(styles.home__info)}>
                            <h1 className={clsx(styles.home__title)}>Hi, I&apos;m Angga Ari Wijaya</h1>
                            <h2 className={clsx(styles.home__subtitle)}>Software Engineer</h2>
                            <p className={clsx(styles.home__detail)}>
                                Committed to delivering high-quality software solutions
                                with a strong interest in cutting-edge technologies and programming.
                            </p>
                            <p className={clsx(styles.home__location)}><i className="uil-location-point"></i> Surabaya, Indonesia</p>
                        </div>
                        <a href="#contact" className="button">Hire Me</a>
                    </div>
            </div>
        </section>
    );
};
