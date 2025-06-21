import styles from "./Tema.module.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Mousewheel } from "swiper/modules";

export default function Tema() {
  return (
    <section className={styles.sectionTema}>
      <p className={styles.textSection}>(теми конференції)</p>
      <ul className={styles.wrapperTitles}>
        <li>
          <h2 className={styles.defoultStylestitle}>Стан</h2>
        </li>
        <li>
          <h2 className={styles.defoultStylestitle}>тіло</h2>
        </li>
        <li>
          <h2 className={styles.defoultStylestitle}>гроші</h2>
        </li>
        <li>
          <h2 className={styles.defoultStylestitle}>секс</h2>
        </li>
      </ul>
      <Swiper
        spaceBetween={0}
        direction="vertical"
        modules={[Mousewheel]}
        mousewheel={{
          releaseOnEdges: true,
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
