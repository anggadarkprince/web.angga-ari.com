import Image from "next/image";
import styles from './ShowcaseItem.module.css';
import Link from "next/link";

export interface ShowcaseItemProps {
    slug: string,
    title: string,
    subtitle: string,
    image?: string | null,
    url?: string | null,
}

export const ShowcaseItem = ({slug, title, subtitle, image, url}: ShowcaseItemProps) => {
    return (
      <div>
        <Link href={`/showcases/${slug}`} className={styles.showcase__item}>
          <Image src={image || ''} width={270} height={270} alt={title} className={styles.showcase__image} loading="lazy" />
          <h2 className={styles.showcase__title}>{title}</h2>
          <p className={styles.showcase__description}>{subtitle}</p>
        </Link>
        {url ? <a href={url} target="_blank">{url}</a> : <Link href={`/showcases/${slug}`}>Show Details</Link>}
      </div>
    )
}
