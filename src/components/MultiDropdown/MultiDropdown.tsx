import React from 'react';
import Input from '../Input';
import { useMultiDropdown } from './useMultiDropdown';
import s from './MultiDropdown.module.scss';

export type Option = {
  key: string | number;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
  afterSlot?: React.ReactNode;
  isOpenCategory: boolean;
  onOpenCategory: (value: boolean) => void;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
  afterSlot,
  isOpenCategory,
  onOpenCategory,
  ...props
}) => {
  const {
    containerRef,
    isInputFocused,
    selected,
    setIsInputFocused,
    setFilterText,
    handleChange,
    toggleDropdown,
    plaseholder,
    filteredOptions,
    handleClickOption,
  } = useMultiDropdown({
    options,
    value,
    onChange,
    disabled,
    getTitle,
    onOpenCategory,
  });



  return (
    <div className={`${className} ${s.multiDropdown}`} ref={containerRef}>
      <Input
        value={
         isInputFocused || selected.length === 0 ? '' : getTitle(selected)
        }
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => {
          setIsInputFocused(false);
          setFilterText('');
        }}
        onChange={handleChange}
        onClick={() => toggleDropdown(true)}
        placeholder={plaseholder}
        disabled={disabled}
        afterSlot={afterSlot}
        readOnly
        {...props}
      />
      {!disabled && isOpenCategory && (
        <div className={s.options}>
          {filteredOptions.map((option) => (
            <p key={option.key} className={
            `${s.options__element} 
            ${selected.some(selectedOption => selectedOption.key === option.key) ? s.option__active : ''}`
            } onClick={() => handleClickOption(option.key)}>
              {option.value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);
