import styles from "./DonationComp.module.css";
import donationLines from './LinesDonationComp.svg'
import heart from '../heart.webp'

export default function DonationComp() {
  return (
    <section className={styles.donationSectionComp}>
      <div className="container">
        <article className={styles.DonationCompArticle}>
          <img
            className={styles.donationLines}
            src={donationLines}
            alt="background"
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
            target="_blank"
            className={styles.detailsDonation}
            href="https://www.instagram.com/mobile_dental_ukraine?igsh=MWoxc2czZ2RnaHRxNA=="
          >
            дізнатись більше
          </a>
        </article>
        <article className={styles.wrapperHeartBlock}>
          <ul className={styles.wrapperHeartBlockList}>
            <li className={styles.wrapperHeart}>
              <img className={styles.heartIMG} src={heart} alt="heart" />
              <p className={styles.textInHeart}>
                У вас буде можливість не лише отримати унікальну річ, <br />а й
                зробити вагомий внесок у силу, яка нас захищає
              </p>
            </li>
            <li className={styles.wrapperHeartList}>
              <ul className={styles.heartList}>
                <li>
                  <p className={styles.number}>(01)</p>
                  <h3 className={styles.titleNumber}>
                    Привілейовані лоти з <span>глибоким</span> змістом
                  </h3>
                </li>
                <li>
                  <p className={styles.number}>(02)</p>
                  <h3 className={styles.titleNumber}>
                    Живий <span>аукціон</span> під час конференції
                  </h3>
                </li>
                <li>
                  <p className={styles.number}>(03)</p>
                  <h3 className={styles.titleNumber}>
                    Донат на 1000€ = 2000€ сертифікат на керамічні реставрації
                    від <span>@kazo.younique</span>
                  </h3>
                  <p className={styles.textUnderTitleNumber}>
                    *при виконанні від 10 реставрацій
                  </p>
                  <p className={styles.textUnderTitleNumber}>
                    *сертифікат можна оформити для подарунку вашим рідним або
                    друзям
                  </p>
                </li>
                <li>
                  <p className={styles.number}>(04)</p>
                  <h3 className={styles.titleNumber}>
                    Усі кошти — <span>на підтримку ЗСУ</span>
                  </h3>
                </li>
              </ul>
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}
