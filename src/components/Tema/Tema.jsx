import { useEffect, useRef, useState } from "react";
import styles from "./Tema.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, EffectCreative } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";

export default function Tema() {
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const totalSlides = 4;

  // Фиксируем свайпер при попадании в зону видимости
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLocked(true);
          document.body.style.overflow = "hidden";
          sectionRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
          setIsLocked(false);
          document.body.style.overflow = "auto";
        }
      },
      { threshold: 0.9 } // 90% секции должно быть видно
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      document.body.style.overflow = "auto";
    };
  }, []);

  // Обработка смены слайда
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const handleSlideChange = () => setActiveIndex(swiper.realIndex);

    swiper.on("slideChange", handleSlideChange);
    return () => swiper.off("slideChange", handleSlideChange);
  }, []);

  // Автопереход после последнего или первого слайда
  useEffect(() => {
    if (!isLocked) return;

    const timeout = setTimeout(() => {
      if (activeIndex === totalSlides - 1) {
        document.body.style.overflow = "auto";
        document
          .querySelector("#sectionProgramOnConference")
          ?.scrollIntoView({ behavior: "smooth" });
      }

      if (activeIndex === 0) {
        document.body.style.overflow = "auto";
        document
          .querySelector("#beforeSwiper")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [activeIndex, isLocked]);

  return (
    <section className={styles.sectionTema} id="sectionTema" ref={sectionRef}>
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
