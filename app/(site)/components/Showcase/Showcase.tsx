import styles from './Showcase.module.css';
import {clsx} from "clsx";
import {ShowcaseItem} from "@/app/(site)/components/Showcase/ShowcaseItem";

const showcases = [
    {
        title: 'Info Gue Website',
        subtitle: 'Web Development',
        image: '/assets/img/showcase/infogue-web.jpg',
    },
    {
        title: 'Orion Note App',
        subtitle: 'UI/UX Design',
        image: '/assets/img/showcase/orion.jpg',
    },
    {
        title: 'Jagamana',
        subtitle: 'Website Development',
        image: '/assets/img/showcase/jagamana.jpg',
    },
    {
        title: 'Info Gue Mobile',
        subtitle: 'Android Development',
        image: '/assets/img/showcase/infogue-mobile.jpg',
    },
    {
        title: 'The Banna',
        subtitle: 'Game Development',
        image: '/assets/img/showcase/the-banna.jpg',
    },
]
export const Showcase = () => {
    return (
        <section className="section" id="showcase">
            <h1 className="section__title">Showcase</h1>
            <h3 className="section__subtitle">My current project and portfolios</h3>
            <div className={clsx(styles.showcase__container, 'container grid')}>
                {showcases.map(showcase => (
                    <ShowcaseItem
                        key={showcase.title}
                        title={showcase.title}
                        subtitle={showcase.subtitle}
                        image={showcase.image} />
                ))}
                <a href="#" className={clsx(styles.showcase__moreButton, 'button button--flex')}>
                    See More...
                    <small>More projects already completed</small>
                </a>
            </div>
        </section>
    )
}
