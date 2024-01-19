import { useState } from "react";

export default function useDebounce(delay: number) {
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);

  const debounce = (action: () => void) => {
    clearTimeout(timer);

    setTimer(
      setTimeout(() => {
        action();
      }, delay),
    );
  };
  return debounce;
}
