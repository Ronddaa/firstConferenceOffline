import { useEffect, useRef, useState } from "react";
import styles from "./Tema.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, EffectCreative } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";

export default function Tema() {
  const swiperRef = useRef(null); // Сохраняем экземпляр свайпера
  const swiperWrapperRef = useRef(null); // Ссылка на обёртку секции, чтобы отслеживать её видимость
  const [activeIndex, setActiveIndex] = useState(0); // Текущий активный слайд
  const [scrollLocked, setScrollLocked] = useState(false); // Блокировка scroll сайта, пока свайпер активен

  const totalSlides = 4; // Общее количество слайдов

  // Следим за сменой слайда и обновляем индекс
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const handleSlideChange = () => {
      setActiveIndex(swiper.realIndex);
    };

    swiper.on("slideChange", handleSlideChange);
    return () => swiper.off("slideChange", handleSlideChange);
  }, []);

  // Следим, попал ли свайпер в зону видимости (используем IntersectionObserver)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrollLocked(entry.isIntersecting); // true, если свайпер в зоне видимости
      },
      {
        threshold: 0.4, // 40% секции должно быть видно, чтобы считать её активной
      }
    );

    if (swiperWrapperRef.current) {
      observer.observe(swiperWrapperRef.current);
    }

    return () => {
      if (swiperWrapperRef.current) {
        observer.unobserve(swiperWrapperRef.current);
      }
    };
  }, []);

  // Автоматический скролл вверх/вниз после крайнего слайда
  useEffect(() => {
    if (!scrollLocked) return;

    const timeout = setTimeout(() => {
      // Если дошли до последнего слайда, скроллим к следующему блоку
      if (activeIndex === totalSlides - 1) {
        const nextBlock = document.querySelector("#sectionProgramOnConference");
        if (nextBlock) {
          nextBlock.scrollIntoView({ behavior: "smooth" });
        }
      }

      // Если на первом слайде и свайпнули вверх (или зашли снизу), скроллим к блоку выше
      if (activeIndex === 0) {
        const prevBlock = document.querySelector("#beforeSwiper");
        if (prevBlock) {
          prevBlock.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 1000); // Ждём 1 секунду после перехода на слайд

    return () => clearTimeout(timeout);
  }, [activeIndex, scrollLocked]);

  return (
    <section
      className={styles.sectionTema}
      id="sectionTema"
      ref={swiperWrapperRef} // Назначаем ссылку для IntersectionObserver
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
        mousewheel={{ releaseOnEdges: true }} // Разрешаем прокрутку за пределы свайпера
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
          swiperRef.current = swiper; // Сохраняем инстанс свайпера
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
