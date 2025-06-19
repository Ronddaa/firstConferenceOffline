import styles from "./Program.module.css";
import sprite from "../icons.svg";

export default function Program() {
  return (
    <section className={styles.sectionProgram}>
      <div className="container">
        <p className={styles.btwsectionText}>
          <svg className={styles.arrowList} width={24} height={24}>
            <use xlinkHref={`${sprite}#icon-arrow`}></use>
          </svg>{" "}
          вниз
        </p>
        <ul className={styles.wrapperDateInfo}>
          <li>
            <p className={styles.date}>23</p>
            <p className={styles.mounth}>серпня</p>
          </li>
          <li>
            <p className={styles.hotelName}>
              Westin hotel
              <br />
              Warsaw
            </p>
          </li>
        </ul>

        {/* Next Block */}

        <p className={styles.btwTexttwo}>(Про конференцію)</p>

        <h2 className={styles.titleProgram}>
          створюємо <span>преміальний</span> простір для української спільноти{" "}
          <br className={styles.brMobile} /> в<span> Європі</span>
        </h2>
        <p className={styles.textUnderTitleProgram}>
          Це подія для тих,
          <br className={styles.brMobile} /> хто мислить ширше,
          <br className={styles.brMobile} /> цінує зміст, силу
          <br className={styles.brMobile} /> єдності, естетику та
          <br className={styles.brMobile} /> розвиток — незалежно
          <br className={styles.brMobile} /> від статі, але з
          <br className={styles.brMobile} /> українським корінням,
          <br className={styles.brMobile} /> культурою і духом
        </p>
      </div>
    </section>
  );
}
