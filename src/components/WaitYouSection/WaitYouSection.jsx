import styles from "./WaitYouSection.module.css";
import prgramLi1IMG from "./programLi1.webp";
import prgramLi2IMG from "./programLi2.webp";
import prgramLi3IMG from "./programLi3.webp";
import prgramLi4IMG from "./prgramLi4IMG.webp";

export default function WaitYouSection() {
  return (
    <section className={styles.WaitYouSection} id="WaitYouSectionAnchor">
      <div className="container">
        <p className={styles.textBtw}>(що на тебе чекає)</p>
        <ul className={styles.wrapperProgramList}>
          <li>
            <p className={styles.numberOfList}>(01)</p>
            <h3 className={styles.titlelistOne}>
              15+ спікерів <br /> із досвідом
            </h3>
            <p className={styles.textlistOne}>
              Ти почуєш про тіло з точки зору науки, про гроші - без
              стереотипів, про секс - відкрито, без розмитих формулювань
            </p>
          </li>
          <li>
            <img
              className={styles.objectFitprogramIMG}
              src={prgramLi3IMG}
              alt="programIMG"
            />
          </li>
          <li>
            <p className={styles.numberOfList}>(02)</p>
            <h3 className={styles.titlelistTwo}>Нетворкінг</h3>
            <p className={styles.textlistTwo}>
              Це - підприємці, засновниці проектів, творці змін, українки з
              різних країн Європи. У тебе буде час і простір не тільки для
              знайомств, а й для справжніх розмов - про ідеї, цілі, партнерство
              й підтримку
            </p>
          </li>
          <li>
            <img
              className={styles.objectFitprogramIMG}
              src={prgramLi2IMG}
              alt="programIMG"
            />
          </li>
          <li>
            <p className={styles.numberOfList}>(03)</p>
            <h3 className={styles.titlelistThree}>Преміум-шоу</h3>
            <p className={styles.textlistThree}>
              Показ мод від українських дизайнерів. Вишуканість авторського
              меню. Усе це - на тлі гала-атмосфери з дрес-кодом, де важлива
              кожна деталь - від освітлення до келиха у твоїй руці
            </p>
          </li>
          <li>
            <img
              className={styles.objectFitprogramIMG}
              src={prgramLi1IMG}
              alt="programIMG"
            />
          </li>
          <li>
            <p className={styles.numberOfList}>(04)</p>
            <h3 className={styles.titlelistFour}>
              Ексклюзивний виступ MONATIK для гостей конференції
            </h3>
          </li>
          <li>
            <img
              className={styles.monatikIMG}
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
    </section>
  );
}
