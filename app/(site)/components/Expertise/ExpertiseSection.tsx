import styles from './ExpertiseSection.module.css';
import {ExpertiseItem, ExpertiseItemProps} from "@/app/(site)/components/Expertise/ExpertiseItem";
import {clsx} from "clsx";

interface ExpertiseSectionProps {
    title: string,
    subtitle: string,
    icon?: string | null,
    expertises: ExpertiseItemProps[],
}

export const ExpertiseSection = ({title, subtitle, icon, expertises}: ExpertiseSectionProps) => {
    return (
        <div className={styles.expertise__group}>
            <i className={clsx(styles.expertise__icon, icon)}></i>
            <div>
                <div className={styles.expertise__header}>
                    <h3>{title}</h3>
                    <p className={styles.expertise__subtitle}>{subtitle}</p>
                </div>
                <div className={styles.expertise__list}>
                    {expertises.map(item => (
                        <ExpertiseItem
                            key={item.title}
                            title={item.title}
                            subtitle={item.subtitle}
                            level={item.level} />
                    ))}
                </div>
            </div>
        </div>
    );
}
