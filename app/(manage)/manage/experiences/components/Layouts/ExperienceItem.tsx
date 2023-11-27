import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "@/app/components/Dropdowns";
import {Card} from "@/app/components/Card";
import styles from './ExperienceItem.module.css';
import {dateFormat} from "@/app/utility/helpers";

interface ExperienceCardItemProps {
  label: string;
  title: string;
  subtitle: string;
  from: Date | string;
  to?: Date | string | null;
  onEdit?: () => void;
  onDelete?: () => void;
}
export const ExperienceItem = ({label, title, subtitle, from, to, onEdit, onDelete}: ExperienceCardItemProps) => {
  return (
    <Card className="shadow-lg border-0 display-flex flex-row flex-justify-between">
      <div>
        <p className={styles.experience__label}>{label}</p>
        <h4 className={styles.experience__title}>{title}</h4>
        <p className={styles.experience__subtitle}>{subtitle}</p>
        <p className={styles.experience__period}>{dateFormat(from, 'yyyy')} - {to ? dateFormat(to, 'yyyy') : 'Now'}</p>
      </div>
      <Dropdown>
        <DropdownToggle noArrow={true}><i className="uil-ellipsis-v"></i></DropdownToggle>
        <DropdownMenu positionRight={true}>
          <DropdownItem icon="uil-pen" title="Edit" onClick={onEdit}/>
          <DropdownItem icon="uil-trash" title="Delete" onClick={onDelete}/>
        </DropdownMenu>
      </Dropdown>
    </Card>
  )
}
