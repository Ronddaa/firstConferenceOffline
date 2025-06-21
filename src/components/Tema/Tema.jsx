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

  // Флаги для контроля выхода за пределы свайпера
  const tryingToScrollUpFromFirst = useRef(false);
  const tryingToScrollDownFromLast = useRef(false);

  // Отслеживаем смену слайда
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const onSlideChange = () => {
      setActiveIndex(swiper.realIndex);
      // Сбрасывать флаги при смене слайда не надо,
      // чтобы избежать преждевременного сброса попыток выхода
    };

    swiper.on("slideChange", onSlideChange);
    return () => swiper.off("slideChange", onSlideChange);
  }, []);

  // Отслеживаем, когда свайпер попадает в зону видимости
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScrollLocked(true);
          document.body.style.overflow = "hidden";
          // Плавно скроллим к секции свайпера
          swiperWrapperRef.current?.scrollIntoView({ behavior: "smooth" });
        } else {
          setScrollLocked(false);
          document.body.style.overflow = "auto";
          // Сбрасываем флаги выхода при уходе со свайпера
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

  // Обработка колёсика мыши для определения попытки прокрутки за край свайпера
  useEffect(() => {
    if (!scrollLocked) return;

    const onWheel = (e) => {
      if (!swiperRef.current) return;
      const isFirstSlide = activeIndex === 0;
      const isLastSlide = activeIndex === totalSlides - 1;

      if (isFirstSlide && e.deltaY < 0) {
        // Попытка прокрутки вверх с первого слайда
        tryingToScrollUpFromFirst.current = true;
      } else if (isLastSlide && e.deltaY > 0) {
        // Попытка прокрутки вниз с последнего слайда
        tryingToScrollDownFromLast.current = true;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [scrollLocked, activeIndex]);

  // Обработка тач-событий для мобильных устройств
  useEffect(() => {
    if (!scrollLocked) return;

    let touchStartY = 0;

    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!swiperRef.current) return;

      const touchCurrentY = e.touches[0].clientY;
      const diffY = touchStartY - touchCurrentY;

      const isFirstSlide = activeIndex === 0;
      const isLastSlide = activeIndex === totalSlides - 1;

      if (isFirstSlide && diffY < -10) {
        tryingToScrollUpFromFirst.current = true;
      } else if (isLastSlide && diffY > 10) {
        tryingToScrollDownFromLast.current = true;
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [scrollLocked, activeIndex]);

  // Автоматический скролл вверх/вниз при попытке выйти за край свайпера
  useEffect(() => {
    if (!scrollLocked) return;

    const timeout = setTimeout(() => {
      if (
        activeIndex === totalSlides - 1 &&
        tryingToScrollDownFromLast.current
      ) {
        const nextBlock = document.querySelector("#sectionProgramOnConference");
        if (nextBlock) {
          document.body.style.overflow = "auto";
          nextBlock.scrollIntoView({ behavior: "smooth" });
          tryingToScrollDownFromLast.current = false;
        }
      }
      if (activeIndex === 0 && tryingToScrollUpFromFirst.current) {
        const prevBlock = document.querySelector("#beforeSwiper");
        if (prevBlock) {
          document.body.style.overflow = "auto";
          prevBlock.scrollIntoView({ behavior: "smooth" });
          tryingToScrollUpFromFirst.current = false;
        }
      }
    }, 600);

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
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
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
