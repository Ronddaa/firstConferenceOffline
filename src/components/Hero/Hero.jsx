import styles from './Hero.module.css'

export default function Hero() {
    return (
      <section className={styles.sectionHero}>
        <div className="container">
          <h1 className={styles.mainTitle}>КОД ЖІНКИ</h1>
          <h2 className={styles.titlePlace}>варшава</h2>
          <p className={styles.detailsTextHero}>
            Преміальна українсько-європейська конференція у форматі спікер-шоу
          </p>
          <button className={styles.buyBtnHero}>придбати квиток</button>
        </div>
      </section>
    );
}