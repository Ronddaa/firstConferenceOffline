import styles from './Hero.module.css'

export default function Hero() {
    return (
      <section className={styles.sectionHero}>
        <div className="container">
          <h1 className={styles.mainTitle}>КОД ЖІНКИ</h1>
          <p className={styles.detailsTextHero1}>
            Преміальна українсько-європейська конференція у форматі спікер-шоу
          </p>
          <h2 className={styles.titlePlace}>варшава</h2>
          <p className={styles.detailsTextHero2}>
            до Дня Незалежності <br />— для тих, хто творить майбутнє
          </p>
          <button className={styles.buyBtnHero}>придбати квиток</button>
        </div>
      </section>
    );
}