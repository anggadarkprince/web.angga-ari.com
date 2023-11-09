import {clsx} from "clsx";

export const PageTitle = ({title, subtitle, className}: {title: string, subtitle?: string, className?: string}) => (
  <div className={clsx(className)}>
    <h1 className="section__title">{title}</h1>
    {subtitle && <p className="section__subtitle">{subtitle}</p>}
  </div>
);
