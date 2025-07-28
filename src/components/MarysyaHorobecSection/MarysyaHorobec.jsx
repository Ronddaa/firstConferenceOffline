import styles from './MarysyaHorobec.module.css'
import HorobecIMG from './MarysyahorobecMobile.webp'
import logoMGVC from './LogoMGVC.webp'

export default function MarysyaHorobec() {
    return (
      <section className={styles.MarysyaHorobecSection} id="horobecSection">
        <div className="container">
          <p className="btwSectionText">
            (наша ведуча <br /> та бранч від MGVc)
          </p>
          <div className={styles.wrapperHorobecIMG}>
            <img
              className={styles.HorobecIMG}
              src={HorobecIMG}
              alt="Marysya Horobec"
            />
            <ul>
              <h2 className={styles.title}>Марися Горобець - </h2>
              <h3 className={styles.textTitle}>
                ведуча конференції <br /> «КОД ЖІНКИ»
              </h3>
            </ul>
          </div>
          <ul className={styles.wrapperHorobecList}>
            <li>
              <p className={styles.number}>(01)</p>
              <p className={styles.detailsNumber}>
                Українська телеведуча, амбасадорка культурної дипломатії та
                експертка з елегантного нетворкінгу. Понад 20 років у
                телебаченні - від телеведучої до генерального продюсера каналу.
              </p>
            </li>
            <li>
              <p className={styles.number}>(02)</p>
              <p className={styles.detailsNumber}>
                Більше 15 років на сцені як ведуча - у портфоліо понад 3000
                мистецьких, культурних і благодійних проєктів в Україні та
                Європі.
              </p>
            </li>
            <li>
              <p className={styles.number}>(03)</p>
              <p className={styles.detailsNumberY}>
                Засновниця MGVC (Marysya Gorobets Vision Club) - платформи
                елегантного нетворкінгу, що об’єднує жінок з 2017 року та
                надихає розкривати свій унікальний код сили, краси й
                взаємопідтримки.
              </p>
            </li>
          </ul>
          <article className={styles.wrapperPurpleBlock}>
            <img className={styles.logoMGVC} src={logoMGVC} alt="MGVC Logo" />
            <h4 className={styles.titlePurpleBlock}>
              <span>Kod Zhinky &</span> <br /> Vision Brunch by <br />
              <span>Marysya Gorobets</span>
            </h4>
            <p className={styles.textPurpleBlock}>
              Запрошуємо приєднатися до Kod Zhinky Vision Brunch, який
              відбудеться 24 серпня - у День Незалежності України - в рамках
              конференції «КОД ЖІНКИ».
            </p>
            <a href="/horobec" className={styles.linkToHorobecPage}>
              детальніше про бранч
            </a>
          </article>
        </div>
      </section>
    );
}