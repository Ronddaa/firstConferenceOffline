import styles from './Donation.module.css'

export default function Donation() {
    return (
      <section className={styles.sectionDonation} id='donation'>
        <div className="container">
          <h2 className={styles.titleDonation}>
            Підтримка благодійного фонду “Kazo Mobile”
          </h2>
          <p className={styles.textDonation}>
            Зібрані під час нашої конференції кошти підуть на підтримку
            благодійного фонду “Kazo Mobile”, який надає безкоштовну
            стоматологічну допомогу захисникам на лінії зіткнення через мобільну
            пересувну стоматологію.
          </p>
          <ul className={styles.wrapperDonationList}>
            <li>
              <p className={styles.textLi}>За два роки було здійснено</p>
              <h3 className={styles.titleLih31}>35</h3>
              <h4 className={styles.titleLih41}>виїздів</h4>
            </li>
            <li>
              <p className={styles.textLi}>допомогу отримали майже</p>
              <h3 className={styles.titleLih32}>2000</h3>
              <h4 className={styles.titleLih42}>захисників</h4>
            </li>
            <li>
              <p className={styles.textLi}>У 2023 році виїзд тривав</p>
              <h3 className={styles.titleLih33}>200</h3>
              <h4 className={styles.titleLih43}>днів</h4>
            </li>
          </ul>
          <a
            className={styles.detailsDonation}
            href="https://www.instagram.com/mobile_dental_ukraine?igsh=MWoxc2czZ2RnaHRxNA=="
          >
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
        <div className="container">
          <p className={styles.lastTextDonation}>
            У вас буде можливість не лише отримати <br /> унікальну річ, а й
            зробити вагомий <br />
            внесок у силу, яка нас захищає
          </p>
        </div>
      </section>
    );
}