import { useState, useRef, useEffect, useCallback } from 'react';
import type { Option } from './MultiDropdown';

interface UseMultiDropdownProps {
  disabled?: boolean;
  value: Option[];
  options: Option[];
  onChange: (value: Option[]) => void;
  getTitle: (value: Option[]) => string;
}

export function useMultiDropdown({
  disabled,
  value,
  options,
  onChange,
  getTitle,
}: UseMultiDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = useCallback(
    (value: boolean) => {
      if (disabled) setIsOpen(false);
      setIsOpen(value);
    },
    [disabled, setIsOpen, setIsOpen]
  );

  const [selected, setSelected] = useState<Option[]>(value);
  const handleClickOption = useCallback(
    (key: string) => {
      const selectedOption = options.find((option) => option.key === key);
      if (!selectedOption) return;

      setSelected((prev) => {
        const isSelected = prev.some((option) => option.key === key);
        let newSelected;

        if (isSelected) {
          newSelected = prev.filter((option) => option.key !== key);
          onChange(newSelected);
        } else {
          newSelected = [...prev, selectedOption];
          onChange([selectedOption]);
        }
        return newSelected;
      });
    },
    [options, onChange]
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
  };
}
