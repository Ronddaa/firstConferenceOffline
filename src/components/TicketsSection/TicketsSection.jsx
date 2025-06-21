import styles from "./TicketsSection.module.css";
import sprite from "../icons.svg";

export default function Tickets() {
  return (
    <section className={styles.sectionTickets}>
      <div className="container">
        <p className={styles.textBtwSection}>(тарифи на участь)</p>
        <ul className={styles.wrapperTicketsTariff}>
          <li className={styles.TicketsGold}>
            <h3 className={styles.titleTariffCard}>GOLD</h3>
            <p className={styles.kolPlace}>Залишилось 30 місць</p>
            <ul className={styles.wrapperDetailsTariff}>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-diamond`}></use>
                </svg>
                <p className={styles.detailsText}>Місця: позначені жовтим</p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-palms`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Напої: один келих ігристого + вода
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-clock`}></use>
                </svg>
                <p className={styles.detailsText}>Дві кавопаузи</p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-people`}></use>
                </svg>
                <p className={styles.detailsText}>Нетворкінг </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-fire`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Участь у розіграші подарунків
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-micro`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Ексклюзивний концерт MONATIK
                </p>
              </li>
            </ul>
            <p className={styles.priceText}>300$</p>
            <button className={styles.btnBuyTariffGold}>придбати квиток</button>
            <button className={styles.btnPlaceShow}>переглянути місця</button>
          </li>
          <li className={styles.TicketsPremium}>
            <h3 className={styles.titleTariffCard}>premium</h3>
            <p className={styles.kolPlace}>Залишилось 30 місць</p>
            <ul className={styles.wrapperDetailsTariff}>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-diamond`}></use>
                </svg>
                <p className={styles.detailsText}>Місця: позначені жовтим</p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-palms`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Напої: один келих ігристого + вода
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-clock`}></use>
                </svg>
                <p className={styles.detailsText}>Дві кавопаузи</p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-people`}></use>
                </svg>
                <p className={styles.detailsText}>Нетворкінг </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-fire`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Участь у розіграші подарунків
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-pazzle`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Ексклюзивний концерт MONATIK
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-coins`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Ексклюзивний концерт MONATIK
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-micro`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Ексклюзивний концерт MONATIK
                </p>
              </li>
            </ul>
            <p className={styles.priceText}></p>
            <button className={styles.btnBuyTariff}>придбати квиток</button>
            <button className={styles.btnPlaceShow}>переглянути місця</button>
          </li>
          <li>
            <h3 className={styles.titleTariffCard}></h3>
            <p className={styles.kolPlace}>Залишилось 30 місць</p>
            <ul className={styles.wrapperDetailsTariff}>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-diamond`}></use>
                </svg>
                <p className={styles.detailsText}>Місця: позначені жовтим</p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-palms`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Напої: один келих ігристого + вода
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-clock`}></use>
                </svg>
                <p className={styles.detailsText}>Дві кавопаузи</p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-hands`}></use>
                </svg>
                <p className={styles.detailsText}>Дві кавопаузи</p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-people`}></use>
                </svg>
                <p className={styles.detailsText}>Нетворкінг </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-fire`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Участь у розіграші подарунків
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-pazzle`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Ексклюзивний концерт MONATIK
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-star`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Ексклюзивний концерт MONATIK
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-convert`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Ексклюзивний концерт MONATIK
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-coins`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Ексклюзивний концерт MONATIK
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-micro`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Ексклюзивний концерт MONATIK
                </p>
              </li>
            </ul>
            <p className={styles.priceText}></p>
            <button className={styles.btnBuyTariff}>придбати квиток</button>
            <button className={styles.btnPlaceShow}>переглянути місця</button>
          </li>
        </ul>
      </div>
    </section>
  );
}
