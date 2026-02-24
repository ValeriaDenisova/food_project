import React from 'react';
import s from './Input.module.scss';

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
        className={`${s.container} ${rest.disabled ? s.container__disabled : ''} ${className}`}
        style={{ width }}
      >
        <input
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${s.input} ${s.container__input}`}
          type="text"
          placeholder={placeholder}
          {...rest}
        />
        {afterSlot && <div className={s.slot}>{afterSlot}</div>}
      </div>
    );
  }
);

export default React.memo(Input);
