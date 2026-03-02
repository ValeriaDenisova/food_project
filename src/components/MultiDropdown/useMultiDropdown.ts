import { useState, useRef, useEffect, useCallback } from 'react';
import type { Option } from './MultiDropdown';

interface UseMultiDropdownProps {
  disabled?: boolean;
  value: Option[];
  options: Option[];
  onChange: (value: Option[]) => void;
  getTitle: (value: Option[]) => string;
  onOpenCategory: (value: boolean) => void;
}

export function useMultiDropdown({
  disabled,
  value,
  options,
  onChange,
  getTitle,
  onOpenCategory
}: UseMultiDropdownProps) {

  const toggleDropdown = useCallback(
    (value: boolean) => {
      if (disabled) {onOpenCategory(false)};
      onOpenCategory(value);
    },
    [disabled, onOpenCategory]
  );


  const [selected, setSelected] = useState<Option[]>(value);
  useEffect(() => {
    setSelected(value);
  }, [value]);

  // const selectedValue: Option[] = [];

  // for(let i=0; i< value.length; i++){
  //   selectedValue.push(value[i])
  // }

  // setSelected(selectedValue);

  useEffect(() => {
   onChange(selected);
  }, [selected, onChange]);


  const handleClickOption = useCallback(
    (key: string | number) => {
      const selectedOption = options.find((option) => option.key === key);
      if (!selectedOption) return;

      setSelected((prev) => {
        const isSelected = prev.some((option) => option.key === key);
        let newSelected;

        if (isSelected) {
          newSelected = prev.filter((option) => option.key !== key);
        } else {
          newSelected = [...prev, selectedOption];
        }
        return newSelected;
      });
    
    },
    [options]
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  const plaseholder: string = getTitle([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        toggleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [filterText, setFilterText] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const handleChange = useCallback(
    (value: string) => {
      setFilterText(value);
    },
    [setFilterText]
  );

  const filteredOptions =
    filterText.trim() === ''
      ? options
      : options.filter((option) => option.value.toLowerCase().includes(filterText.toLowerCase()));

  return {
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
  };
}
