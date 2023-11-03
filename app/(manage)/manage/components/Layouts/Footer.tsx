import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="display-flex flex-justify-between">
        <span className="text-fade">
            Copyright © {new Date().getFullYear()} <a href="#" target="_blank">Angga Ari Wijaya</a> all rights reserved.
        </span>
        <span className="text-fade">
            Hand-crafted &amp; made with <i className="uil-heart color-error"></i>
        </span>
      </div>
    </footer>
  )
}
