import styles from "./Tema.module.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Mousewheel, EffectFade } from "swiper/modules";

export default function Tema() {
  return (
    <section className={styles.sectionTema}>
      <Swiper
        spaceBetween={30}
        direction="vertical"
        effect={"fade"}
        modules={[EffectFade, Mousewheel]}
        mousewheel={{
          releaseOnEdges: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide className={styles.swiperTema1}>
          <p className={styles.textSection}>(теми конференції)</p>
          <h2 className={`${styles.titleTema1} ${styles.titleTema1Slide1}`}>
            Стан
          </h2>
          <h2 className={styles.titleTema1}>
            Тіло<span className={styles.titleTemaSpan}>(генетика)</span>
          </h2>
          <h2 className={styles.titleTema1}>Гроші</h2>
          <h2 className={styles.titleTema1}>Секс</h2>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperTema2}>
          <p className={styles.textSection}>(теми конференції)</p>
          <h2 className={styles.titleTema2}>Стан</h2>
          <h2 className={`${styles.titleTema2} ${styles.titleTema2Slide2}`}>
            Тіло<span className={styles.titleTemaSpan}>(генетика)</span>
          </h2>
          <h2 className={styles.titleTema2}>Гроші</h2>
          <h2 className={styles.titleTema2}>Секс</h2>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperTema3}>
          <p className={styles.textSection}>(теми конференції)</p>
          <h2 className={styles.titleTema3}>Стан</h2>
          <h2 className={styles.titleTema3}>
            Тіло<span className={styles.titleTemaSpan}>(генетика)</span>
          </h2>
          <h2 className={`${styles.titleTema3} ${styles.titleTema2Slide3}`}>
            Гроші
          </h2>
          <h2 className={styles.titleTema3}>Секс</h2>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperTema4}>
          <p className={styles.textSection}>(теми конференції)</p>
          <h2 className={styles.titleTema4}>Стан</h2>
          <h2 className={styles.titleTema4}>
            Тіло<span className={styles.titleTemaSpan}>(генетика)</span>
          </h2>
          <h2 className={styles.titleTema4}>Гроші</h2>
          <h2 className={`${styles.titleTema4} ${styles.titleTema2Slide4}`}>
            Секс
          </h2>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
