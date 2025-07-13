import styles from "../HeroHorobec.module.css";
import HorobecHeroDesc from "../HorobecHeroDesc.webp";

export default function HeroHorobecComp() {
  return (
    <>
      <section className={styles.HeroHorobecSection}>
        <img
          className={styles.HorobecHeroDescIMG}
          src={HorobecHeroDesc}
          alt="backrgound"
        />
        <div className="container">
          <h1 className={styles.titleHorobecPage}>
            <span>Kod Zhinky</span> & Vision Brunch by
            <span> Marysya Gorobets</span>
          </h1>
          <p className={styles.textHero}>
            Запрошуємо приєднатися до Kod Zhinky Vision Brunch, який відбудеться
            24 серпня - у День Незалежності України - в рамках конференції «КОД
            ЖІНКИ».
          </p>
          <ul className={styles.wrapperListHero}>
            <li>
              <p className={styles.ask}>Кількість місць</p>
              <p className={styles.infoText}>35 місць</p>
            </li>
            <li>
              <p className={styles.ask}>Вартість участі</p>
              <p className={styles.infoTextPrice}>250€</p>
            </li>
            <li>
              <p className={styles.ask}>дата та час</p>
              <p className={styles.infoText}>24.08 / 11:00 - 15:00</p>
            </li>
            <li>
              <p className={styles.ask}>Локація</p>
              <p className={styles.infoText}>поки тримаємо в секреті</p>
            </li>
          </ul>
        </div>
      </section>
      <ul className={styles.wrapperTwoBlocksDesc}>
        <li className={styles.block1Desc}>
          <h2 className={styles.titleTwoBlock1Desc}>
            MGVC - Marysya Gorobets Vision Club - платформа елегантного
            нетворкінгу
          </h2>
          <p className={styles.textblock1Desc}>
            яка об’єднує з 2017 року українських жінок із глобальним баченням,
            місією та сенсами. Сьогодні спільнота MGVC - це понад 300 берегинь,
            що творять свої історії успіху в Україні та по всій Європі. <br />
            <br /> Географія бранчів охоплює Київ, Львів, Одесу, Лондон, Відень,
            Мілан, Монако, Канни, Париж, Ригу
          </p>
          <p className={styles.lastTextblock1Desc}>та от знов у Варшаві!</p>
        </li>
        <li className={styles.block2Desc}>
          <h2 className={styles.titleTwoBlock2Desc}>
            Бранчі Марисі Горобець - це завжди ще й унікальні локації:
          </h2>
          <p className={styles.textblock2Desc}>
            від музеїв Києва та мистецьких галерей до палаців Відня і найвищої
            точки України - маківки Говерли. Це надихаючі кола жіночої сили, де
            панує камерна атмосфера елегантного нетворкінгу. Як каже Марися
            «Контакти це ваша нематеріальна спадщина ЮНЕСКО».
          </p>
          <h3 className={styles.titleTwoBlock22Desc}>Тому зустрічі MGVC -</h3>
          <p className={styles.textblock2Desc}>
            це завжди простір для того, щоб сформувати унікальну колекцію нових
            цінних контактів.
          </p>
        </li>
      </ul>
    </>
  );
}
