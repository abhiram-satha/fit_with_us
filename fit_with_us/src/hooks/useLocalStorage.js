import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const existingValue = localStorage.getItem(key);
    if (existingValue) {
      return existingValue;
    } else {
      return initialValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, value);
  }, []);

  return [value, setValue];
}
