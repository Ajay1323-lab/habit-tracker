import { useState } from "react";

const useLocalStorage = (key, initial) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initial
  );

  const setStoredValue = val => {
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  };

  return [value, setStoredValue];
};

export default useLocalStorage;
