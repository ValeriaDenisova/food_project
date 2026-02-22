import React, { useCallback } from 'react';
import styles from './CheckBox.module.scss';
import CheckIcon from '../icons/CheckIcon';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, disabled, ...restProps }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    },
    [onChange]
  );

  return (
    <label className={`${styles.checkboxContainer} ${disabled ? styles.disabledContainer : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles.checkbox}
        {...restProps}
        style={{ opacity: 0 }}
      />
      <span
        className={`${styles.customCheckmark} ${disabled ? styles.disabledSpan : ''} ${!disabled ? styles.hover : ''}`}
      >
        {checked && !disabled && (
          <CheckIcon color="accent" width={40} height={40} className={styles.notDisabled} />
        )}
        {checked && disabled && (
          <CheckIcon color="primary" width={40} height={40} className={styles.disabled} />
        )}
      </span>
    </label>
  );
};

export default CheckBox;
