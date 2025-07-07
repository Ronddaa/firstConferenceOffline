import styles from "./PageThx.module.css";
import logo from "./logo.svg";
import art from "./PageThank.svg";
import sprite from "../components/icons.svg";

export default function PageThx() {
  return (
    <section className={styles.PageThx}>
      <img className={styles.PageThxIMG} src={art} alt="art" />
      <img
        className={styles.logo}
        src={logo}
        alt="logo"
        width={274}
        height={69}
      />
      <h2 className={styles.titleThank}>Ура, ти з нами!</h2>
      <p className={styles.lizText}>І в нас — мурахи по шкірі!</p>
      <p className={styles.iventDate}>
        <span>23 серпня ми зустрінемось у Варшаві!</span>{" "}
        <br className={styles.brMobile} />
        <br className={styles.brDesc} />
        Там, де можна дихати на повні груди, сміятись до сліз, мовчати{" "}
        <br className={styles.brDesc} />
        по-справжньому і бути собою — поруч із такими ж жінками!
      </p>
      <p className={styles.blueText}>
        Ми дуже чекаємо на тебе! <br className={styles.brDesc} />І вже
        відчуваємо твою присутність!
      </p>
      <h3 className={styles.titleChoise}>
        обери, куди відправити <br className={styles.brDesc} />
        твій квиток:
      </h3>
      <ul className={styles.wrapperChoiseButtons}>
        <li>
          <button className={styles.choiseBtn}>
            на telegram
            <svg className={styles.arrowList} width={24} height={24}>
              <use xlinkHref={`${sprite}#icon-arrow`}></use>
            </svg>
          </button>
        </li>
        <li>
          <button className={styles.choiseBtn}>
            на пошту
            <svg className={styles.arrowList} width={24} height={24}>
              <use xlinkHref={`${sprite}#icon-arrow`}></use>
            </svg>
          </button>
        </li>
        <li>
          <button className={styles.choiseBtn}>
            завантажити тут
            <svg className={styles.arrowList} width={24} height={24}>
              <use xlinkHref={`${sprite}#icon-arrow`}></use>
            </svg>
          </button>
        </li>
      </ul>
      <p className={styles.connectTelegramText}>
        для того, щоб бути в курсі <span>всіх анонсів</span> і бекстейджу{" "}
        <br className={styles.brDesc} />
        підготовки, приєднуйся до нашого telegram-каналу!
      </p>
      <ul className={styles.wrapperConnectTelegramList}>
        <li>
          <a className={styles.telegramLink} href="https://t.me/warsawkod_bot">
            приєднатись
            <svg className={styles.arrowListLink} width={24} height={24}>
              <use xlinkHref={`${sprite}#icon-arrow`}></use>
            </svg>
          </a>
        </li>
        <li>
          <svg className={styles.telegSVG} width={87} height={87}>
            <use xlinkHref={`${sprite}#icon-teleg`}></use>
          </svg>
        </li>
      </ul>
    </section>
  );
}
