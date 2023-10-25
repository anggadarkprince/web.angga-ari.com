import styles from './Showcase.module.css';
import {clsx} from "clsx";
import {ShowcaseItem} from "@/app/(site)/components/Showcase/ShowcaseItem";
import {ForwardedRef, forwardRef} from "react";
import {Project} from "@/app/(site)/components/Project/Project";
import {ShowcaseType} from "@/app/types";
import Link from "next/link";

interface ShowcaseProps {
  showcases: ShowcaseType[]
}
export const Showcase = forwardRef(({showcases}: ShowcaseProps, ref: ForwardedRef<HTMLElement>) => {
  return (
    <>
      <section className="section" id="showcase" ref={ref}>
        <h1 className="section__title">Showcase</h1>
        <h3 className="section__subtitle">My current project and portfolios</h3>
        <div className={clsx(styles.showcase__container, 'container grid')}>
          {showcases.map(showcase => (
            <ShowcaseItem
              key={showcase.slug}
              slug={showcase.slug}
              title={showcase.title}
              subtitle={showcase.subtitle}
              url={showcase.url}
              image={showcase.image}/>
          ))}
          <Link href="/showcases" className={clsx(styles.showcase__moreButton, 'button button--flex')}>
            See More...
            <small>More projects already completed</small>
          </Link>
        </div>
      </section>
      <Project/>
    </>
  )
});
Showcase.displayName = 'Showcase';
