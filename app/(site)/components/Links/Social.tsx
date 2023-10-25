import {clsx} from "clsx";
import styles from './Social.module.css';
import {useTheme} from "@/app/context/ThemeContext";

interface SocialProps {
  type: 'github' | 'instagram' | 'twitter' | 'linkedin',
  url: string,
}

export const Social = ({type, url}: SocialProps) => {
  const {theme} = useTheme();
  const githubTheme = theme === 'dark' && type === 'github' ? {color: '#f2f2f2'} : {};
  return (
    <a href={url} className={clsx(styles.socialLink, styles[`socialLink__${type}`])} style={githubTheme} target="_blank">
      <i className={clsx(styles.socialIcon, `uil-${type}`)}></i>
    </a>
  )
}
