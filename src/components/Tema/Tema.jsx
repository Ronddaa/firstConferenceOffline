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


  // Отслеживаем активный слайд
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const onSlideChange = () => {
      setActiveIndex(swiper.realIndex);
    };

    swiper.on("slideChange", onSlideChange);
    return () => swiper.off("slideChange", onSlideChange);
  }, []);

  // Плавный переход к секции, когда она попадает в зону видимости
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            swiperWrapperRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      },
      { threshold: 0.25 }
    );

    if (swiperWrapperRef.current) observer.observe(swiperWrapperRef.current);

    return () => {
      if (swiperWrapperRef.current)
        observer.unobserve(swiperWrapperRef.current);
    };
  }, []);

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
          prev: { translate: [0, "-100%", 0], opacity: 0.5 },
          next: { translate: [0, "100%", 0], opacity: 0.5 },
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
