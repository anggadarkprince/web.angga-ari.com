"use client"

import styles from './ScrollUp.module.css';
import {clsx} from "clsx";
import {useEffect, useState} from "react";

interface ScrollUpProps {
  target?: string
}
export const ScrollUp = ({target = '#home'}: ScrollUpProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const window = event.currentTarget as Window;
      setScrollTop(window.scrollY);
      setShowScroll(window.scrollY >= 560);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <a href={target} className={clsx(styles.scrollUp, showScroll && styles.showScroll)} id="scroll-up">
      <i className={clsx('uil-arrow-up', styles.scrollUp__icon)}></i>
    </a>
  )
}
