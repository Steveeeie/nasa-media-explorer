import { useEffect } from "react";

function useNoScroll() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);
}

export { useNoScroll };
