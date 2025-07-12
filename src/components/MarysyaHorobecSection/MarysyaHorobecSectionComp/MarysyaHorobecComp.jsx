import styles from "../MarysyaHorobec.module.css";
import HorobecIMG from "../MarysyahorobecMobile.webp";
import logoMGVC from "../LogoMGVC.svg";
import horobecSVG from './horobecSVG.svg'

export default function HorobecSectionComp() {
  return (
    <section className={styles.horobecSectionComp}>
      <div className="container">
        <p className={styles.textBtw}>(наша ведуча та бранч від MGVc)</p>
        <article className={styles.wrapperHorobecInfo}>
          <div className={styles.wrapperHorobecIMG}>
            <img className={styles.HorobecIMG} src={HorobecIMG} alt="img" />
            <img className={styles.horobecSVG} src={horobecSVG} alt="lines" />
          </div>
          <div className={styles.HorobecInfoWrapper}>
            <h2 className={styles.title}>Марися Горобець - </h2>
            <h3 className={styles.textTitle}>
              ведуча конференції <br /> «КОД ЖІНКИ»
            </h3>
            <ul className={styles.wrapperHorobecList}>
              <li>
                <p className={styles.number}>(01)</p>
                <p className={styles.detailsNumber}>
                  Українська телеведуча, амбасадорка культурної <br />{" "}
                  дипломатії та експертка з елегантного нетворкінгу. <br />{" "}
                  Понад 20 років у телебаченні - від телеведучої до <br />{" "}
                  генерального продюсера каналу.
                </p>
              </li>
              <li>
                <p className={styles.number}>(02)</p>
                <p className={styles.detailsNumber}>
                  Більше 15 років на сцені як ведуча - <br /> у портфоліо понад
                  3000 мистецьких, <br /> культурних і благодійних проєктів{" "}
                  <br /> в Україні та Європі.
                </p>
              </li>
              <li>
                <p className={styles.number}>(03)</p>
                <p className={styles.detailsNumberY}>
                  Засновниця MGVC (Marysya Gorobets Vision <br /> Club) -
                  платформи елегантного <br /> нетворкінгу, що об’єднує жінок з
                  2017 року <br /> та надихає розкривати свій унікальний <br />{" "}
                  код сили, краси й взаємопідтримки.
                </p>
              </li>
            </ul>
          </div>
        </article>
        <article className={styles.wrapperLogoTeam}>
          <ul>
            <li>
              <h4 className={styles.titlePurpleBlock}>
                <span>Kod Zhinky &</span> <br /> Vision Brunch by <br />
                <span>Marysya Gorobets</span>
              </h4>
              <p className={styles.textPurpleBlock}>
                Запрошуємо приєднатися до Kod Zhinky Vision Brunch, який
                відбудеться 24 серпня - у День Незалежності України - в рамках
                конференції «КОД ЖІНКИ».
              </p>
              <a href="#horobecSection" className={styles.linkToHorobecPage}>
                детальніше про бранч
              </a>
            </li>
            <li>
              <img className={styles.logoMGVC} src={logoMGVC} alt="Logo" />
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}
