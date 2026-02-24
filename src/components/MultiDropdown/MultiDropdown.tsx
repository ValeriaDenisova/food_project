import React from 'react';
import Input from '../Input';
import { useMultiDropdown } from './useMultiDropdown';
import s from './MultiDropdown.module.scss';

export type Option = {
  key: string;
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
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
  afterSlot,
  ...props
}) => {
  const {
    containerRef,
    isInputFocused,
    filterText,
    selected,
    setIsInputFocused,
    setFilterText,
    handleChange,
    toggleDropdown,
    plaseholder,
    isOpen,
    filteredOptions,
    handleClickOption,
  } = useMultiDropdown({
    options,
    value,
    onChange,
    disabled,
    getTitle,
  });

  return (
    <div className={`${className} ${s.multiDropdown}`} ref={containerRef}>
      <Input
        value={isInputFocused ? filterText : selected.length ? getTitle(selected) : ''}
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
        {...props}
      />
      {!disabled && isOpen && (
        <div className={s.options}>
          {filteredOptions.map((option) => (
            <p key={option.key} onClick={() => handleClickOption(option.key)}>
              {option.value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);
