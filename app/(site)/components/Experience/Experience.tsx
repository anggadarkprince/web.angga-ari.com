import styles from './Experience.module.css';
import {clsx} from "clsx";
import {ExperienceItem} from "@/app/(site)/components/Experience/ExperienceItem";

const experiences = [
    {
        label: 'High School',
        title: 'Mechanic Automotive',
        subtitle: 'SMK Semen Gresik',
        from: '2007-01-01',
        to: '2010-01-01',
    },
    {
        label: 'College',
        title: 'System Information',
        subtitle: 'University of Jember',
        from: '2010-01-01',
        to: '2016-01-01',
    },
    {
        label: 'Full-time Working',
        title: 'Fullstack Developer',
        subtitle: 'PT. Transcon Indonesia',
        url: 'https://transcon-indonesia.com',
        from: '2017-01-01',
        to: null,
    },
    {
        label: 'Part-time Working',
        title: 'OSS Developer',
        subtitle: 'Sketch Project Studio',
        from: '2023-01-01',
        to: null,
    },
];

export const Experience = () => {
    return (
        <section className="section" id="experience">
            <h1 className="section__title">Experiences</h1>
            <h3 className="section__subtitle">My qualification and journey</h3>

            <div className={clsx(styles.experience__container, 'container')}>
                {experiences.map((experience, index) => (
                    <ExperienceItem
                        key={experience.title}
                        label={experience.label}
                        title={experience.title}
                        subtitle={experience.subtitle}
                        from={experience.from}
                        to={experience.to}
                        position={(index + 1) % 2 == 0 ? 'right' : 'left'}/>
                ))}
            </div>
        </section>
    )
}
