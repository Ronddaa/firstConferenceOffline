import styles from './Donation.module.css'
import donationIMG from './donationSection.webp'

export default function Donation() {
    return (
      <section className={styles.sectionDonation}>
        <div className="container">
          <img
            className={styles.donationIMG}
            src={donationIMG}
            alt="donation"
          />
          <h2 className={styles.titleDonation}>
            Підтримка благодійного фонду “Kazo Mobile”
          </h2>
          <p className={styles.textDonation}>
            Зібрані під час нашої конференції кошти підуть на підтримку
            благодійного фонду “Kazo Mobile”, який надає безкоштовну
            стоматологічну допомогу захисникам на лінії зіткнення через мобільну
            пересувну стоматологію.
          </p>
          <a className={styles.detailsDonation} href="#">
            дізнатись більше
          </a>
        </div>
        <div className={styles.heartBlock}>
          <p className={styles.numerOf}>(01)</p>
          <h3 className={styles.title}>
            Привілейовані лоти з <span>глибоким</span> змістом
          </h3>
          <p className={styles.numerOf}>(02)</p>
          <h3 className={styles.title}>
            Живий <br /> <span>аукціон</span> під час конференції
          </h3>
          <p className={styles.numerOf}>(03)</p>
          <h3 className={styles.title}>
            Усі кошти — <br />
            <span>на підтримку</span> <span>ЗСУ</span>
          </h3>
        </div>
      </section>
    );
}