import styles from "./TicketsSection.module.css";
import sprite from "../icons.svg";
import TicketsForm from "../Modals/Tickets/TicketsForm";
import { useState } from "react";
import ShowPlace from "../Modals/ShowPlace/ShowPlace";

export default function Tickets() {

  const [modalTicketsIsOpen, setmodalTickets] = useState(false);
  const [modalShowPlaceIsOpen, setmodalShowPlace] = useState(false);


  return (
    <section className={styles.sectionTickets} id="tariff">
      <div className="container">
        <p className={styles.textBtwSection}>(тарифи на участь)</p>
        <ul className={styles.wrapperTicketsTariff}>
          <li className={styles.TicketsGold}>
            <h3 className={styles.titleTariffCard}>GOLD</h3>
            <p className={styles.kolPlace}>Залишилось 98 місць</p>
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
                  Welcome drink (один <br /> келих ігристого) + вода
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
                  Участь у розіграші <br /> подарунків
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-pazzle`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Пакет з подарунками <br /> gold класу
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
            <p className={styles.priceText}>300&euro;</p>
            <button
              className={styles.btnBuyTariffGold}
              onClick={() => {
                setmodalTickets(true);
              }}
            >
              придбати квиток
            </button>
            <button
              className={styles.btnPlaceShow}
              onClick={() => {
                setmodalShowPlace(true);
              }}
            >
              переглянути місця
            </button>
          </li>
          <li className={styles.TicketsPremium}>
            <h3 className={styles.titleTariffCard}>premium</h3>
            <p className={styles.kolPlace}>Залишилось 52 місця</p>
            <ul className={styles.wrapperDetailsTariff}>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-diamond`}></use>
                </svg>
                <p className={styles.detailsText}>Місця: позначені блакитним</p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-palms`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Welkome drink(один <br /> келих ігристого) + вода
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-clock`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Дві кавопаузи <br /> <span>+ Асортимент закусок</span>
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
                  Участь у розіграші <br /> подарунків
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-pazzle`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Пакет з подарунками <br /> <span>premium класу</span>
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-blackHole`}></use>
                </svg>
                <p className={styles.detailsText}>
                  <span>
                    Ігристе перед концертом: <br /> келих щоб налаштуватись{" "}
                    <br /> на вечір
                  </span>
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
            <p className={styles.priceText}>450&euro;</p>
            <button
              className={styles.btnBuyTariffPremium}
              onClick={() => {
                setmodalTickets(true);
              }}
            >
              придбати квиток
            </button>
            <button
              className={styles.btnPlaceShow}
              onClick={() => {
                setmodalShowPlace(true);
              }}
            >
              переглянути місця
            </button>
          </li>
          <li className={styles.TicketsGold}>
            <h3 className={styles.titleTariffCard}>LUXE</h3>
            <p className={styles.kolPlace}>Залишилось 25 місць</p>
            <ul className={styles.wrapperDetailsTariff}>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-diamond`}></use>
                </svg>
                <p className={styles.detailsText}>Місця: позначені червоним</p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-palms`}></use>
                </svg>
                <p className={styles.detailsText}>
                  <span>безлімітне ігристе</span> <br />+ вода
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-clock`}></use>
                </svg>
                <p className={styles.detailsText}>
                  Дві кавопаузи <br />+ Асортимент закусок
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-hands`}></use>
                </svg>
                <p className={styles.detailsText}>
                  <span>
                    Повноцінний обід <br /> зі спікерами
                  </span>
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={38} height={38}>
                  <use xlinkHref={`${sprite}#icon-people`}></use>
                </svg>
                <p className={styles.detailsText}>
                  <span>Ексклюзивна зона для спілкування зі спікерами</span>
                </p>
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
                  Пакет з подарунками <br />
                  <span>luxe класу</span>
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-coins`}></use>
                </svg>
                <p className={styles.detailsText}>
                  <span>
                    Знижка -10% на <br /> наступну конференцію
                  </span>
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-star`}></use>
                </svg>
                <p
                  className={`${styles.detailsText} ${styles.underPresidentRoom}`}
                >
                  <span>
                    -50% знижка на бранч <br /> у президентському номері{" "}
                  </span>
                  <span className={styles.underPresidentRoomSpan}>
                    наступного дня (24.08.2025)
                  </span>
                </p>
              </li>
              <li>
                <svg className={styles.detailsSVG} width={28} height={28}>
                  <use xlinkHref={`${sprite}#icon-convert`}></use>
                </svg>
                <p className={styles.detailsText}>
                  <span>
                    Відео та фото матеріали <br /> після заходу{" "}
                  </span>
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
            <p className={styles.priceText}>1200&euro;</p>
            <button
              className={styles.btnBuyTariffGold}
              onClick={() => {
                setmodalTickets(true);
              }}
            >
              придбати квиток
            </button>
            <button
              className={styles.btnPlaceShow}
              onClick={() => {
                setmodalShowPlace(true);
              }}
            >
              переглянути місця
            </button>
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
              <p className={styles.priceText}>150&euro;</p>
              <button className={styles.btnBuyTariffGold}>
                придбати квиток
              </button>
            </div>
          </li>
        </ul>
        {/* <ul className={styles.wrapperAuction}>
          <li>(Аукціон речей зі змістом)</li>
          <li>Мистецтво, створене серцем. Для тих, хто відчуває глибше</li>
        </ul>
        <div className={styles.wrappertitleAuction}>
          <h4 className={styles.titleAuctionMobile}>Під час конференції</h4>
          <h4
            className={`${styles.titleAuctionMobile} ${styles.titleAuctionMobileMargin}`}
          >
            <span>«Код ЖІНКИ»</span>
          </h4>
          <h4 className={styles.titleAuctionMobile}>
            відбудеться благодійний{" "}
          </h4>
          <h4 className={styles.titleAuctionMobile}>аукціон на </h4>
          <h4
            className={`${styles.titleAuctionMobile} ${styles.titleAuctionMobileMargin2}`}
          >
            підтримку <span>Збройних</span>
          </h4>
          <h4
            className={`${styles.titleAuctionMobile} ${styles.titleAuctionMobileMargin3}`}
          >
            <span className={styles.titleAuctionMobileMarginSpan}>
              Сил України
            </span>
          </h4>
        </div>
        <p className={styles.lastTextTeckets}>
          Ми зібрали ексклюзивні речі з усієї України, створені геніальними
          українськими <br /> майстрами — кожен лот має історію, енергію й
          глибокий сенс
        </p> */}
      </div>
      <TicketsForm
        isOpen={modalTicketsIsOpen}
        onClose={() => setmodalTickets(false)}
      ></TicketsForm>
      <ShowPlace
        isOpen={modalShowPlaceIsOpen}
        onClose={() => setmodalShowPlace(false)}
      ></ShowPlace>
    </section>
  );
}
