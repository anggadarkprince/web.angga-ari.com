import styles from './Experience.module.css';
import {clsx} from "clsx";
import {ForwardedRef, forwardRef} from "react";
import {ExperienceItem} from "@/app/(site)/components/Experience/ExperienceItem";
import {ExperienceType} from "@/app/types";

interface ExperienceProps {
  experiences: ExperienceType[]
}
export const Experience = forwardRef(async ({experiences}: ExperienceProps, ref: ForwardedRef<HTMLElement>) => {
    return (
        <section className="section" id="experience" ref={ref}>
            <h1 className="section__title">Experiences</h1>
            <h3 className="section__subtitle">My qualification and journey</h3>

            <div className={clsx(styles.experience__container, 'container')}>
                {experiences.map((experience, index) => (
                  <ExperienceItem
                    key={experience.title}
                    label={experience.label}
                    title={experience.title}
                    subtitle={experience.subtitle}
                    from={experience.from.getFullYear().toString()}
                    to={experience.to?.getFullYear().toString()}
                    url={experience.url}
                    position={(index + 1) % 2 == 0 ? 'right' : 'left'}/>
                ))}
            </div>
        </section>
    )
});
Experience.displayName = 'Experience';
