import {useState} from "react";

const useStateWithCallback = <T = any>(initialValue: T) => {
  const [value, setValue] = useState(initialValue);

  const setValueAndCallback = (newValue: T, callback: (prevV: T, newV: T) => void) => {
    setValue(prevValue => {
      if (callback) {
        callback(prevValue, newValue);
      }
      return newValue;
    });
  };

  return [value, setValueAndCallback];
}

export default useStateWithCallback;
