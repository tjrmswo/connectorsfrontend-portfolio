"use client";

import { useEffect, useState } from "react";

export const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<string | undefined | null>(null);

  useEffect(() => {
    const item = window.localStorage.getItem(key);
    setValue(item);
  }, [key]);

  const updateValue = (newValue: string) => {
    window.localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  const removeValue = () => {
    window.localStorage.removeItem(key);
    setValue(null);
  };

  return { value, updateValue, removeValue };
};
