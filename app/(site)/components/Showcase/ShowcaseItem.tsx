import Image from "next/image";
import styles from './ShowcaseItem.module.css';

export interface ShowcaseItemProps {
    title: string,
    subtitle: string,
    image: string,
}
export const ShowcaseItem = ({title, subtitle, image}: ShowcaseItemProps) => {
    return (
        <a href="#" className={styles.showcase__item}>
            <Image src={image} width={270} height={270} alt={title} className={styles.showcase__image} loading="lazy" />
            <h2 className={styles.showcase__title}>{title}</h2>
            <p className={styles.showcase__description}>{subtitle}</p>
        </a>
    )
}
