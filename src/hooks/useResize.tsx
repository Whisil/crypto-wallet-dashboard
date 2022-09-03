import { useEffect } from "react";

export function useResize(state: boolean, onResize: () => void) {
  useEffect(() => {

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [state]);
}