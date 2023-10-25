import styles from './Expertise.module.css';
import {clsx} from "clsx";
import {ExpertiseSection} from "@/app/(site)/components/Expertise/ExpertiseSection";
import {ForwardedRef, forwardRef} from "react";
import {ExpertiseSectionType} from "@/app/types";

interface ExpertiseProps {
    expertises: ExpertiseSectionType[]
}
export const Expertise = forwardRef(async ({expertises}: ExpertiseProps, ref: ForwardedRef<HTMLElement>) => {
    return (
        <section className="section" id="expertise" ref={ref}>
            <h1 className="section__title">Expertise</h1>
            <h3 className="section__subtitle">My technical level</h3>

            <div className={clsx(styles.expertise__container, 'container grid')}>
                {expertises.map(expertise => (
                    <ExpertiseSection
                        key={expertise.title}
                        title={expertise.title}
                        subtitle={expertise.subtitle}
                        icon={expertise.icon}
                        expertises={expertise.expertises} />
                ))}
            </div>
        </section>
    );
});
Expertise.displayName = 'Expertise';
