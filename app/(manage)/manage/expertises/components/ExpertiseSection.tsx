import {PropsWithChildren} from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "@/app/components/Dropdowns";
import styles from './ExpertiseSection.module.css';
import {clsx} from "clsx";
import {Button} from "@/app/components/Buttons";
import {Collapse, CollapseItem, CollapseToggle} from "@/app/components/Collapse";

interface ExpertiseSectionProps {
  title: string;
  subtitle: string;
  icon: string | null;
  onAddExpertise: () => void
  onEdit: () => void
  onDelete: () => void
}
export const ExpertiseSection = ({title, subtitle, icon, onAddExpertise, onEdit, onDelete, children}: PropsWithChildren<ExpertiseSectionProps>) => {
  return (
    <div className={styles.expertise__item}>
      <Collapse collapsed={false}>
        <div className="display-flex flex-justify-between">
          <div className="display-flex">
            <CollapseToggle>
              {isCollapse => (
                <Button size="small" className="mt-0-5 mr-1">
                  <i className={clsx('uil-angle-down text-large', isCollapse && styles.collapsed)}></i>
                </Button>
              )}
            </CollapseToggle>
            <i className={clsx(styles.expertise__icon, icon || 'uil-apps')}></i>
            <div>
              <h3>{title}</h3>
              <p className={styles.expertise__subtitle}>{subtitle}</p>
            </div>
          </div>
          <Dropdown className={"mt-0-5"}>
            <DropdownToggle variant={"info"} size={"small"}>Action</DropdownToggle>
            <DropdownMenu positionRight={true}>
              <DropdownItem icon="uil-file" title="Add Expertise" onClick={onAddExpertise}/>
              <DropdownItem icon="uil-pen" title="Edit" onClick={onEdit}/>
              <DropdownItem icon="uil-trash" title="Delete" onClick={onDelete}/>
            </DropdownMenu>
          </Dropdown>
        </div>
        <CollapseItem as={"div"} className="display-grid col-lg-2 gap-1 pl-3 mt-0-5">
          {children}
        </CollapseItem>
      </Collapse>
    </div>
  )
}
