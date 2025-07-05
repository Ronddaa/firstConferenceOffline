import styles from './HeroComp.module.css'
import heroIMG from '../hero.webp'

export default function HeroComp() {
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
                Преміальна українсько- <br /> європейська конференція <br /> у форматі
                спікер-шоу
              </p>
            </li>
            <li>
              <p className={styles.infoTextHero2}>
                до Дня Незалежності — <br /> для тих, хто творить <br /> майбутнє
              </p>
            </li>
          </ul>
          <article className={styles.wrapperMainTitle}>
            <a className={styles.buyBtnHero} href="#tariff">
              обрати тариф
            </a>
            <p className={styles.WarsawText}>варшава</p>
            <h1 className={styles.mainTitle}>КОД ЖІНКИ</h1>
          </article>
        </div>
      </section>
    );
}