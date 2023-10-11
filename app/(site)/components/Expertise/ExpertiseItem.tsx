import {clsx} from "clsx";
import styles from './ExpertiseItem.module.css';

export interface ExpertiseItemProps {
    title: string,
    subtitle: string,
    level: number,
}

export const ExpertiseItem = ({title, subtitle, level}: ExpertiseItemProps) => {
    const levelItems = Array.from({length: 5}, (_, i) => i + 1);
    return (
        <div className={styles.expertise__item}>
            <h4>{title}</h4>
            <p>{subtitle}</p>
            <div className={styles.expertise__level} data-skill={level}>
                {levelItems.map(number => (
                    <i key={number}
                       className={clsx(
                            styles.expertise__levelItem,
                            number <= level ? styles.circleFilled : styles.circleMuted
                        )}
                    ></i>
                ))}
            </div>
        </div>
    )
}
