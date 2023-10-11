import {clsx} from "clsx";
import styles from './Social.module.css';

interface SocialProps {
  type: 'github' | 'instagram' | 'twitter' | 'linkedin',
  url: string,
}

export const Social = ({type, url}: SocialProps) => {
  return (
    <a href={url} className={clsx(styles.socialLink, styles[`socialLink__${type}`])} target="_blank">
      <i className={clsx(styles.socialIcon, `uil-${type}`)}></i>
    </a>
  )
}
