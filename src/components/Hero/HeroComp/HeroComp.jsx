import styles from "./HeroComp.module.css";
import heroIMG from "../hero.webp";
import { useState } from "react";
import HelperFormUsers from "../../Modals/HelperFormUsers/HelperFormUsers";

export default function HeroComp() {
  const [modalHelperFormUsers, setModalHelperUser] = useState(false);

  return (
    <section className={styles.HeroCompSection}>
      <picture className={styles.heroImgWrapper}>
        <img
          src={heroIMG}
          alt="Фон конференції Код Жінки"
          className={styles.heroImg}
          fetchPriority="high"
          loading="eager"
          width={1920}
          height={1080}
        />
      </picture>
      <div className="container">
        <ul className={styles.wrapperHeroInfoText}>
          <li>
            <p className={styles.infoTextHero1}>
              Преміальна українсько-  європейська конференція  у
              форматі спікер-шоу
            </p>
          </li>
          
        </ul>
        <article className={styles.wrapperMainTitle}>
          <div>
            <button
              className={styles.buyBtnHero}
              onClick={() => setModalHelperUser(true)}
            >
              залишити заявку
            </button>
            <p className={styles.WarsawText}>варшава</p>
          </div>
          <h1 className={styles.mainTitle}>КОД ЖІНКИ</h1>
        </article>
      </div>
      <HelperFormUsers
        isOpen={modalHelperFormUsers}
        onClose={() => setModalHelperUser(false)}
      ></HelperFormUsers>
    </section>
  );
}
