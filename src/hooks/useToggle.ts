import { useState, useCallback } from 'react';

interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (value: boolean) => void;
}

/**
 * A custom hook for managing boolean toggle state.
 * 
 * @param initialValue - The initial boolean value (default: false)
 * @returns An object containing the current value and functions to manipulate it
 * 
 * @example
 * const { value, toggle, setTrue, setFalse } = useToggle(false);
 * 
 * // Toggle the value
 * toggle(); // false -> true
 * 
 * // Set to specific values
 * setTrue();  // always sets to true
 * setFalse(); // always sets to false
 */
export function useToggle(initialValue: boolean = false): UseToggleReturn {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue,
  };
}

export default useToggle;
