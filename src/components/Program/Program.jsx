import styles from "./Program.module.css";
import prgramLi1IMG from './programLi1.webp'
import prgramLi2IMG from './programLi2.webp'
import prgramLi3IMG from './programLi3.webp'
import prgramLi4IMG from "./prgramLi4IMG.webp";
import programBackgroundSvg1 from './programBackgroundSvg1.svg'
import LinesAfterMonatikProgram from './LinesAfterMonatikProgram.svg'
import LinesAfterMonatikProgramDesc from "./LinesAfterMonatikProgramDesc.svg";

export default function Program() {
  return (
    <section className={styles.sectionProgram}>
      <img
        className={styles.programBackgroundSvg1}
        src={programBackgroundSvg1}
        alt="programBackgroundSvg1"
        width={491}
        height={458}
        loading="lazy"
      />
      <div className="container">
        <ul className={styles.wrapperDateInfo}>
          <li>
            <p className={styles.date}>23</p>
            <p className={styles.mounth}>серпня</p>
          </li>
          <li>
            <a
              className={styles.hotelName}
              target="_blank"
              href="https://www.marriott.com/en-us/hotels/wawwi-the-westin-warsaw/overview/"
            >
              Westin hotel
              <br />
              Warsaw
            </a>
          </li>
        </ul>

        {/* Next Block */}

        <p className={styles.btwTexttwo} id="programSectionAnchor">
          (Про конференцію)
        </p>

        <h2 className={styles.titleProgram}>
          створюємо <span>преміальний</span> простір для української спільноти{" "}
          <br className={styles.brMobileTitleProgram} /> в<span> Європі</span>
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

        <ul className={styles.wrapperProgramList}>
          <li>
            <p className={styles.numberOfList}>(01)</p>
            <h3 className={styles.titlelistOne}>Преміум-шоу</h3>
            <p className={styles.textlistOne}>
              Показ дизайнерського одягу, бренд-зона з надзвичайним товаром,
              кейтеринг від шеф кухарів, атмосфера гала-вечері з дрес-кодом
            </p>
          </li>
          <li>
            <img loading="lazy" src={prgramLi1IMG} alt="programIMG" />
          </li>
          <li>
            <p className={styles.numberOfList}>(02)</p>
            <h3 className={styles.titlelistTwo}>Нетворкінг</h3>
            <p className={styles.textlistTwo}>
              Серед 300+ учасників і лідерів <br /> української спільноти в
              Європі
            </p>
          </li>
          <li>
            <img loading="lazy" src={prgramLi2IMG} alt="programIMG" />
          </li>
          <li>
            <p className={styles.numberOfList}>(03)</p>
            <h3 className={styles.titlelistThree}>
              12+ привілейованих спікерів
            </h3>
            <p className={styles.textlistThree}>
              про стан, тіло(генетику), гроші та секс
            </p>
          </li>
          <li>
            <img loading="lazy" src={prgramLi3IMG} alt="programIMG" />
          </li>
          <li>
            <p className={styles.numberOfList}>(04)</p>
            <h3 className={styles.titlelistFour} id="beforeSwiper">
              Ексклюзивний виступ MONATIK для гостей конференції
            </h3>
            {/* <p className={styles.textlistFour}>
              Показ дизайнерського одягу, бренд-зона з надзвичайним товаром,
              кейтеринг від шеф кухарів, атмосфера гала-вечері з дрес-кодом
            </p> */}
          </li>
          <li>
            <img
              className={styles.monatikIMG}
              loading="lazy"
              src={prgramLi4IMG}
              alt="programIMG"
            />
          </li>
        </ul>
        <p className={styles.textUnderprogram}>
          Якщо ти з нами, ти вже ототожнюєш спроможність свого масштабу
          <span> преміальності</span>
        </p>
      </div>
      <img
        loading="lazy"
        className={styles.LinesAfterMonatikProgram}
        src={LinesAfterMonatikProgram}
        alt="LinesAfterMonatikProgram"
        width={760}
        height={360}
      />
      <img
        loading="lazy"
        className={styles.LinesAfterMonatikProgramDesc}
        src={LinesAfterMonatikProgramDesc}
        alt="LinesAfterMonatikProgram"
        width={650}
        height={600}
      />
    </section>
  );
}
