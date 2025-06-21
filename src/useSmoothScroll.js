import { useEffect } from "react";

export default function useSmoothScroll(duration = 800) {
  useEffect(() => {
    let isScrolling = false;

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const smoothScrollBy = (deltaY) => {
      if (isScrolling) return;

      isScrolling = true;

      const startY = window.scrollY;
      const targetY = Math.max(0, startY + deltaY);
      const distance = targetY - startY;

      let startTime = null;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, startY + distance * ease);

        if (elapsed < duration) {
          requestAnimationFrame(animate);
        } else {
          isScrolling = false;
        }
      };

      requestAnimationFrame(animate);
    };

    const wheelHandler = (e) => {
      e.preventDefault();
      smoothScrollBy(e.deltaY);
    };

    window.addEventListener("wheel", wheelHandler, { passive: false });

    return () => {
      window.removeEventListener("wheel", wheelHandler);
    };
  }, [duration]);
}