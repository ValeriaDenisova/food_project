import React from 'react';
import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value?: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
  placeholder?: string;
  width?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, placeholder, width, ...rest }, ref) => {
    return (
      <div
        className={`${styles.inputContainer} ${rest.disabled ? styles.disabled : ''} ${className}`}
        style={{ width }}
      >
        <input
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
          type="text"
          placeholder={placeholder}
          {...rest}
        />
        {afterSlot && <div className={styles.afterSlot}>{afterSlot}</div>}
      </div>
    );
  }
);

export default Input;
