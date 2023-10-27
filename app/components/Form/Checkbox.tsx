import styles from './Checkbox.module.css';

interface CheckboxType {
  name: string,
  label?: string,
  id?: string
}
export const Checkbox = ({name, label, id}: CheckboxType) => {
  return (
    <div className={styles.form__checkbox}>
      <input type="checkbox" name={name} id={id || name}/>
      {label && <label htmlFor={id || name}>{label}</label>}
    </div>
  )
}
