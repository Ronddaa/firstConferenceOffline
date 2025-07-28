import styles from './AnastasiyaSection.module.css'
import Anastasia2 from './Anastasiya2.webp'

export default function AnastasiyaSection() {
    return (
      <section className={styles.AnastasiyaSection}>
        <div className="container">
          <p className="btwSectionText">Під час Warsaw Vision Brunch пройде</p>
          <h2 className={styles.titleAnastasia}>
            Vision Talk з Анастасією Матюшевською -
          </h2>
          <img src={Anastasia2} alt="Matushevska" />
          <p className={styles.textAnastasia}>
            психотерапевтом, сексологом, засновницею конференції «КОД ЖІНКИ».
            Мультидисциплінарна жіноча конференція нового покоління,яка об’єднує
            теми тіла, сексуальності, реалізації, медицини і грошей.
          </p>
          <h3 className={styles.scndTitle}>
            Це - конференція <br /> про жінку 360°
          </h3>
        </div>
      </section>
    );
}