import styles from './AboutConference.module.css'
import aboutBackroundIMG from './AboutBackgroundIMG.webp'

export default function AboutConference() {
    return (
      <section
        className={styles.AboutConferenceSection}
        id="AboutConferenceSectionAnchor"
      >
        <div className="container">
          <p className="btwSectionText">(Про конференцію)</p>
          <h2 className={styles.titleProgram}>
            створюємо <span>преміальний</span> простір для української спільноти
            в<span> Європі</span>
          </h2>
          <ul className={styles.wrappperTextAbout}>
            <li>
              <p className={styles.textAbout}>
                Це подія для жінок, які живуть між <br /> культурами, ролями й
                очікуваннями - <br /> і хочуть зберегти себе справжню
              </p>
            </li>
            <li>
              <p className={styles.textAbout}>
                Для жінок, які вже багато чого <br /> досягли, але залишилось
                відповісти <br /> на запитання: «А де в цьому всьому - я?»
              </p>
            </li>
          </ul>
        </div>
        <article className={styles.wrapperArticle}>
          <img
            className={styles.aboutBackroundIMG}
            src={aboutBackroundIMG}
            alt="bacground"
          />
          <h3 className={styles.titleAbout}>
            Ми створили «Код Жінки» як сучасний простір, де поєднується
            <span> глибина і дія:</span>
          </h3>
          <ul className={styles.wrappperAboutList}>
            <li>
              <h4 className={styles.titleLi}>
                Живі виступи <br /> українських експерток
              </h4>
              <p className={styles.textLi}>у сексології, жіночому здоров’ї</p>
            </li>
            <li>
              <h4 className={styles.titleLi}>
                Знайомства з лікарками, дослідницями тіла <br /> й всесвітньої
                культури
              </h4>
              <p className={styles.textLi}>
                не для фото, а для реальних <br /> інсайтів і підтримки
              </p>
            </li>
          </ul>
        </article>
      </section>
    );
}