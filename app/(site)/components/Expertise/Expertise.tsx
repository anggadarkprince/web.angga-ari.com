import styles from './Expertise.module.css';
import {clsx} from "clsx";
import {ExpertiseSection} from "@/app/(site)/components/Expertise/ExpertiseSection";

const expertises = [
    {
        title: 'Backend',
        subtitle: 'Server-side framework and programming',
        icon: 'uil-brackets-curly',
        expertises: [
            {
                title: 'PHP',
                subtitle: 'Native, Laravel, Code Igniter v3 & v4',
                level: 4,
            },
            {
                title: 'Javascript',
                subtitle: 'Typescript, NodeJS using Express or NestJS',
                level: 3,
            },
            {
                title: 'Server',
                subtitle: 'Nginx, Apache, Ubuntu configuration and monitoring',
                level: 2,
            },
        ],
    },
    {
        title: 'Frontend',
        subtitle: 'Design and mobile app',
        icon: 'uil-brush-alt',
        expertises: [
            {
                title: 'React',
                subtitle: 'ReactJS with NextJS Framework and React Native',
                level: 2,
            },
            {
                title: 'Styling & Semantic',
                subtitle: 'HTML, CSS, SASS preprocessor using Webpack or Vite',
                level: 3,
            },
        ],
    },
    {
        title: 'Database',
        subtitle: 'Data analytic & management',
        icon: 'uil-database-alt',
        expertises: [
            {
                title: 'MySQL',
                subtitle: 'Design, query, replication & optimization',
                level: 4,
            },
            {
                title: 'MongoDB',
                subtitle: 'Simple nosql database transactional',
                level: 2,
            },
        ],
    },
    {
        title: 'Others',
        subtitle: 'Some useful skill-set at work',
        icon: 'uil-wrench',
        expertises: [
            {
                title: 'Git',
                subtitle: 'Image manipulation, photo tuning and modification',
                level: 4,
            },
            {
                title: 'Photoshop',
                subtitle: 'Software release management, development workflow',
                level: 3,
            },
        ],
    },
]
export const Expertise = () => {
    return (
        <section className="section" id="expertise">
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
}
