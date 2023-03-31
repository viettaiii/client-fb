import { useEffect, useState } from "react";


export function useClickOutSide(ref) {
    const [show , setShow] = useState(false);
    function handleClickOutside(event) {
      if (
          ref.current &&
        !ref.current.contains(event.target)
      ) {
          setShow(false);
      }
    }
    const handleClick = () => {
      setShow(!show);
    };
    useEffect(() => {
       
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
    
    },[ref])
    return [ show  , setShow,handleClick];
}