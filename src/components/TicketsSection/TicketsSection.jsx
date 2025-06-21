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
                <p className={styles.detailsText}>
                  Місця: <span>ряди зазначені стендом Balance</span>
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-palms`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Напої: один келих <br /> ігристого + вода
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-clock`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Дві кавопаузи <br /> <span>+ Легкий перекус</span>
                </p>
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
                  <span>Пакет з подарунками</span>
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-micro`}></use>
                </svg>
                <p className={styles.detailsText}>
                  <span>-20% знижки на наступну конференцію</span>
                </p>
              </li>
            </ul>
            <p className={styles.priceText}>450$</p>
            <button className={styles.btnBuyTariffPremium}>
              придбати квиток
            </button>
            <button className={styles.btnPlaceShow}>переглянути місця</button>
          </li>
          <li className={styles.TicketsGold}>
            <h3 className={styles.titleTariffCard}>LUXE</h3>
            <p className={styles.kolPlace}>Залишилось 30 місць</p>
            <ul className={styles.wrapperDetailsTariff}>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-diamond`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Місця: <span>перший ряд</span>
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-palms`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Напої: <span>безлімітне ігристе</span> <br />+ вода
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-clock`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Дві кавопаузи <br />+ Легкий перекус
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-hands`}></use>
                </svg>
                <p className={styles.detailsText}>
                  <span>Повноцінний обід зі спікерами</span>
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-people`}></use>
                </svg>
                <p className={styles.detailsText}>Нетворкінг</p>
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
                <p className={styles.detailsText}>Пакет з подарунками</p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-star`}></use>
                </svg>
                <p className={styles.detailsText}>
                  <span>Бранч в президенському номері </span>
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-convert`}></use>
                </svg>
                <p className={styles.detailsText}>
                  <span>Бранч в президенському номері </span>
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-coins`}></use>
                </svg>
                <p className={styles.detailsText}>
                  -20% знижки на наступну конференцію
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-micro`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Ексклюзивний <br /> концерт MONATIK
                </p>
              </li>
            </ul>
            <p className={styles.priceText}>1200$</p>
            <button className={styles.btnBuyTariffGold}>придбати квиток</button>
            <button className={styles.btnPlaceShow}>переглянути місця</button>
          </li>
          <li className={styles.TicketsOnlyMonatik}>
            <h3 className={styles.titleOnlyTiket}>ONLY TICKET</h3>
            <div className={styles.wrapperInfoTicketOnly}>
              <p className={styles.kolPlace}>Залишилось 30 місць</p>
              <p className={styles.detailsText}>
                <svg className={styles.detailsSVG} width={50} height={50}>
                  <use xlinkHref={`${sprite}#icon-micro`}></use>
                </svg>
                <span>
                  Вхід на фінальну частину конференції — ексклюзивний концерт
                  MONATIK
                </span>
              </p>
              <p className={styles.priceText}>150$</p>
              <button className={styles.btnBuyTariffGold}>
                придбати квиток
              </button>
            </div>
          </li>
        </ul>
        <ul className={styles.wrapperAuction}>
          <li>(Аукціон речей зі змістом)</li>
          <li>Мистецтво, створене серцем. Для тих, хто відчуває глибше</li>
        </ul>
      </div>
    </section>
  );
}
