import { useCallback, useEffect, useState } from "react";

export function useClickOutSide(ref) {
  const [show, setShow] = useState(false);
  const handleClick = useCallback(() => {
    setShow(!show);
  }, [show]);
  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    },
    [ref]
  );
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return [show, setShow, handleClick];
}
