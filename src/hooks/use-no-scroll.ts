import { useEffect } from "react";

function useNoScroll() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);
}

export { useNoScroll };
