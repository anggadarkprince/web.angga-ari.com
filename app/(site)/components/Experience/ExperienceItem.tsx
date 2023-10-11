import styles from './ExperienceItem.module.css';
import Link from "next/link";

export interface ExperienceItemProps {
    label: string,
    title: string,
    subtitle: string,
    from: string,
    to?: string | null,
    url?: string | null,
    position: 'left' | 'right',
}

export const ExperienceItem = ({label, title, subtitle, from, to, url, position = 'left'}: ExperienceItemProps) => {
    const elements = [
        <div key={1}>
            <small className={styles.experience__label}>{label}</small>
            <h3 className={styles.experience__title}>{title}</h3>
            <p className={styles.experience__subtitle}>
                {url ? (
                    <Link href={url} className="experience__subtitle">
                        {subtitle} <i className="uil-external-link-alt color-primary"></i>
                    </Link>
                ) : subtitle}
            </p>
            <p className={styles.experience__period}>
                {new Date(from).getFullYear()} - {to ? new Date(from).getFullYear() : 'Now'}
            </p>
        </div>,
        <div key={2}>
            <span className={styles.experience__point}></span>
            <span className={styles.experience__line}></span>
        </div>,
        <div key={3}></div>
    ]
    return (
        <div className={styles.experience__item}>
            {position == 'left' ? elements : elements.reverse()}
        </div>
    )
}
