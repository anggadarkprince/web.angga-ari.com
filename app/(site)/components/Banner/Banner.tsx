import styles from './Banner.module.css';
import Image from "next/image";
import {clsx} from "clsx";
import {ForwardedRef, forwardRef} from "react";
import {ProfileType} from "@/app/types";
import Link from "next/link";

interface BannerProps {
    profile: ProfileType | null
}
export const Banner = forwardRef(({profile}: BannerProps, ref: ForwardedRef<HTMLElement>) => {
    return (
        <section className="section" id="home" ref={ref}>
            <div className={clsx(styles.home__container, 'container grid')}>
                <Image src="/assets/img/profile.jpg" width={200} height={200} alt={profile?.fullName || ''} className={clsx(styles.home__photo)} />
                <div className={clsx(styles.home__description)}>
                    <div className={clsx(styles.home__info)}>
                        <h1 className={clsx(styles.home__title)}>Hi, I&apos;m {profile?.fullName}</h1>
                        <h2 className={clsx(styles.home__subtitle)}>{profile?.title}</h2>
                        <p className={clsx(styles.home__detail)}>
                            {profile?.tagline}
                        </p>
                        <p className={clsx(styles.home__location)}>
                            <i className="uil-location-point"></i> {profile?.location}
                        </p>
                    </div>
                    <Link href="#contact" className="button">Hire Me</Link>
                </div>
            </div>
        </section>
    );
});
Banner.displayName = 'Banner';
