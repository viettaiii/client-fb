import { useEffect, useState } from "react";

let skeleton = true;
export function useFirstGoToPage() {
  const [show , setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      skeleton = false;
      setShow(false);
    }, 3 * 1000);
  }, []);
  return skeleton;
}
