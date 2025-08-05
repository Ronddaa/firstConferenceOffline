import { useEffect, useRef, useState } from "react";
import styles from "./Tema.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import Tema1 from "./Tema1.webp";
import Tema2 from "./Tema2.webp";
import Tema3 from "./Tema3.webp";
import Tema4 from "./Tema4.webp";

import "swiper/css";
import "swiper/css/effect-fade";

export default function Tema() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Отслеживаем активный слайд
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const onSlideChange = () => {
      setActiveIndex(swiper.realIndex);
    };

    swiper.on("slideChange", onSlideChange);
    return () => {
      swiper.off("slideChange", onSlideChange);
    };
  }, []);

  return (
    <section className={styles.sectionTema} id="sectionTema">
      <div className={styles.backgrondShadow}></div>
      <p className="btwSectionText">(теми конференції)</p>

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
            className={`${styles.defoultStylestitle2} ${
              styles.defoultStylestitle
            } ${activeIndex === 1 ? styles.activeTitle : ""}`}
          >
            тіло<span>(генетика)</span>
          </h2>
        </li>
        <li>
          <h2
            className={`${styles.defoultStylestitle3} ${
              styles.defoultStylestitle
            } ${activeIndex === 2 ? styles.activeTitle : ""}`}
          >
            гроші
          </h2>
        </li>
        <li>
          <h2
            className={`${styles.defoultStylestitle4} ${
              styles.defoultStylestitle
            } ${activeIndex === 3 ? styles.activeTitle : ""}`}
          >
            секс
          </h2>
        </li>
      </ul>

      <Swiper
        effect="fade"
        fadeEffect={{ crossFade: true }}
        direction="horizontal"
        modules={[EffectFade, Autoplay]}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="mySwiper"
      >
        <SwiperSlide className={styles.swiperTema1}>
          <img src={Tema1} alt="img" className={styles.temaIMG} />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperTema2}>
          <img src={Tema2} alt="img" className={styles.temaIMG} />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperTema3}>
          <img src={Tema3} alt="img" className={styles.temaIMG} />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperTema4}>
          <img src={Tema4} alt="img" className={styles.temaIMG} />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
