// hooks/useInertiaScroll.js
import { useEffect } from "react";

/**
 * Инерционный скролл как на мобильных: плавно тянется и замедляется
 * @param {number} multiplier - усиление прокрутки
 * @param {number} friction - сопротивление/торможение (0.85–0.95)
 * @param {number} minVelocity - минимальная скорость остановки
 */
export default function useInertiaScroll(
  multiplier = 1.5,
  friction = 0.9,
  minVelocity = 0.1
) {
  useEffect(() => {
    let velocity = 0;
    let animationFrameId = null;

    const step = () => {
      if (Math.abs(velocity) < minVelocity) {
        velocity = 0;
        animationFrameId = null;
        return;
      }

      window.scrollBy(0, velocity);
      velocity *= friction;

      animationFrameId = requestAnimationFrame(step);
    };

    const onWheel = (e) => {
      e.preventDefault();

      // Добавляем импульс (учитываем направление)
      velocity += e.deltaY * multiplier;

      // Запускаем анимацию, если не идет
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(animationFrameId);
    };
  }, [multiplier, friction, minVelocity]);
}