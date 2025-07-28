import styles from './BranchSection.module.css'
import horobecUl1 from './horobecUl1.webp'
import horobecUl2 from './horobecUl2.webp'
import horobecUl3 from "./horobecUl3.webp";

export default function BranchSection() {
    return (
      <section className={styles.BranchSection}>
        <div className="container">
          <p className="btwSectionText">Бранч традиційно об’єднає</p>
          <h2 className={styles.titleBranch}>50 відтінків жіночих енергій -</h2>
          <p className={styles.text_marginTop}>
            українських бізнес-берегинь, жінок, які сьогодні є амбасадорками
            України у світі, де кожна захищає свій фронт і тим самим наближає
            Україну до перемоги.
          </p>
          <article className={styles.wrapperUlText}>
            <ul className={styles.BranchSectionTitleDonatin}>
              <li>
                <h3 className={styles.dontationTitle}>
                  З початку повномасштабного вторгнення <br /> MGVC тримає
                  <span> благодійну місію:</span>
                </h3>
              </li>
              <li>
                <p className={styles.textDonatin}>
                  під час кожного бранчу відбуваються благодійні аукціони, кошти
                  з яких спрямовуються на підтримку <br /> українських
                  жінок-військових
                </p>
              </li>
            </ul>
            <ul className={styles.wrapperBranchIMG}>
              <li>
                <img src={horobecUl1} alt="1" />
              </li>
              <li>
                <img src={horobecUl2} alt="2" />
              </li>
              <li>
                <img src={horobecUl3} alt="3" />
              </li>
            </ul>
          </article>
        </div>
      </section>
    );
}