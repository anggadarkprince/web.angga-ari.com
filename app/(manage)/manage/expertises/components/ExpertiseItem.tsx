import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "@/app/components/Dropdowns";
import styles from './ExpertiseItem.module.css';
import {clsx} from "clsx";
import {Card} from "@/app/components/Card";

interface ExpertiseItemProp {
  title: string,
  subtitle: string,
  level: number,
  onEdit: () => void,
  onDelete: () => void,
}
export const ExpertiseItem = ({title, subtitle, level, onEdit, onDelete}: ExpertiseItemProp) => {
  return (
    <Card className="shadow-lg border-0 display-flex flex-row flex-justify-between">
      <div className={styles.expertise__item}>
        <h4>{title}</h4>
        <p className={styles.expertise__subtitle}>{subtitle}</p>
        <div className={clsx(styles.expertise__level)}>
          {Array.from(Array(5).keys()).map(item => {
            return (
              <i key={`level-${item}`} className={
                clsx(
                  styles.expertise__levelItem,
                  item < level ? styles.circle__filled : styles.circle__muted
                )
              }></i>
            )
          })}
        </div>
      </div>
      <Dropdown>
        <DropdownToggle noArrow={true}><i className="uil-ellipsis-v color-text"></i></DropdownToggle>
        <DropdownMenu positionRight={true}>
          <DropdownItem icon="uil-pen" title="Edit" onClick={onEdit}/>
          <DropdownItem icon="uil-trash" title="Delete" onClick={onDelete}/>
        </DropdownMenu>
      </Dropdown>
    </Card>
  )
}
