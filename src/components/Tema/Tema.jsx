import { useEffect, useRef, useState } from "react";
import styles from "./Tema.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, EffectCreative } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";

export default function Tema() {
  const swiperRef = useRef(null);
  const swiperWrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(false);

  const totalSlides = 4;

  // Для отслеживания попытки пролистать за границы свайпера
  const tryingToScrollUpFromFirst = useRef(false);
  const tryingToScrollDownFromLast = useRef(false);

  // Смена слайда
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const onSlideChange = () => {
      setActiveIndex(swiper.realIndex);
      // Сброс попыток при смене слайда
      tryingToScrollUpFromFirst.current = false;
      tryingToScrollDownFromLast.current = false;
    };

    swiper.on("slideChange", onSlideChange);
    return () => swiper.off("slideChange", onSlideChange);
  }, []);

  // IntersectionObserver для фиксации свайпера и блокировки скролла
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScrollLocked(true);
          document.body.style.overflow = "hidden";
          swiperWrapperRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
          setScrollLocked(false);
          document.body.style.overflow = "auto";
          tryingToScrollUpFromFirst.current = false;
          tryingToScrollDownFromLast.current = false;
        }
      },
      { threshold: 0.25 }
    );
    if (swiperWrapperRef.current) observer.observe(swiperWrapperRef.current);
    return () => {
      if (swiperWrapperRef.current)
        observer.unobserve(swiperWrapperRef.current);
      document.body.style.overflow = "auto";
    };
  }, []);

  // Отслеживаем попытки прокрутить дальше первого или последнего слайда
  useEffect(() => {
    if (!scrollLocked) return;

    const onWheel = (e) => {
      if (!swiperRef.current) return;
      const _swiper = swiperRef.current;

      // Если на первом слайде и пытаемся прокрутить вверх
      if (activeIndex === 0 && e.deltaY < 0) {
        // Запоминаем, что попытались прокрутить вверх с первого слайда
        tryingToScrollUpFromFirst.current = true;
      }

      // Если на последнем слайде и пытаемся прокрутить вниз
      if (activeIndex === totalSlides - 1 && e.deltaY > 0) {
        // Запоминаем, что попытались прокрутить вниз с последнего слайда
        tryingToScrollDownFromLast.current = true;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [scrollLocked, activeIndex]);

  // Автоскролл на следующий/предыдущий блок только если пользователь действительно пытался выйти за край свайпера
  useEffect(() => {
    if (!scrollLocked) return;

    const timeout = setTimeout(() => {
      // Скроллим вниз, если на последнем слайде и пользователь пытался свайпнуть дальше вниз
      if (
        activeIndex === totalSlides - 1 &&
        tryingToScrollDownFromLast.current
      ) {
        const nextBlock = document.querySelector("#sectionProgramOnConference");
        if (nextBlock) {
          document.body.style.overflow = "auto";
          nextBlock.scrollIntoView({ behavior: "smooth" });
          tryingToScrollDownFromLast.current = false; // сбрасываем флаг
        }
      }

      // Скроллим вверх, если на первом слайде и пользователь пытался свайпнуть дальше вверх
      if (activeIndex === 0 && tryingToScrollUpFromFirst.current) {
        const prevBlock = document.querySelector("#beforeSwiper");
        if (prevBlock) {
          document.body.style.overflow = "auto";
          prevBlock.scrollIntoView({ behavior: "smooth" });
          tryingToScrollUpFromFirst.current = false; // сбрасываем флаг
        }
      }
    }, 800); // небольшой таймаут для плавности

    return () => clearTimeout(timeout);
  }, [activeIndex, scrollLocked]);

  return (
    <section
      className={styles.sectionTema}
      id="sectionTema"
      ref={swiperWrapperRef}
    >
      <p className={styles.textSection}>(теми конференції)</p>

      <ul className={styles.wrapperTitles}>
        <li>
          <h2
            className={`${styles.defoultStylestitle} ${
              activeIndex === 0 ? styles.activeTitle : ""
            }`}
          >
            Стан
          </h2>
        </li>
        <li>
          <h2
            className={`${styles.defoultStylestitle} ${
              activeIndex === 1 ? styles.activeTitle : ""
            }`}
          >
            тіло<span>(генетика)</span>
          </h2>
        </li>
        <li>
          <h2
            className={`${styles.defoultStylestitle} ${
              activeIndex === 2 ? styles.activeTitle : ""
            }`}
          >
            гроші
          </h2>
        </li>
        <li>
          <h2
            className={`${styles.defoultStylestitle} ${
              activeIndex === 3 ? styles.activeTitle : ""
            }`}
          >
            секс
          </h2>
        </li>
      </ul>

      <Swiper
        direction="vertical"
        modules={[Mousewheel, EffectCreative]}
        mousewheel={{ releaseOnEdges: true }}
        effect="creative"
        creativeEffect={{
          prev: {
            translate: [0, "-100%", 0],
            opacity: 0.5,
          },
          next: {
            translate: [0, "100%", 0],
            opacity: 0.5,
          },
        }}
        onSwiper={(_swiper) => {
          swiperRef.current = _swiper;
        }}
        className="mySwiper"
      >
        <SwiperSlide className={styles.swiperTema1}></SwiperSlide>
        <SwiperSlide className={styles.swiperTema2}></SwiperSlide>
        <SwiperSlide className={styles.swiperTema3}></SwiperSlide>
        <SwiperSlide className={styles.swiperTema4}></SwiperSlide>
      </Swiper>
    </section>
  );
}
