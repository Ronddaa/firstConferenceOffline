import styles from "./TicketsSection.module.css";
import sprite from "../icons.svg";
import TicketsForm from "../Modals/Tickets/TicketsForm";
import { useState } from "react";
import ShowPlace from "../Modals/ShowPlace/ShowPlace";
import LastMinuteIMG from './LastMinuteIMG.webp'
import GoldIMG from './GoldIMG.webp'
import PremiumIMG from './PremiumIMG.webp'
import LuxeIMG from './LuxeIMG.webp'

export default function Tickets() {

  const [modalTicketsIsOpen, setmodalTickets] = useState(false);
  const [modalShowPlaceIsOpen, setmodalShowPlace] = useState(false);


  return (
    <section className={styles.sectionTickets} id="ticketsSectionAnchor">
      <div className="container">
        <p className={styles.textBtwSection}>(тарифи на участь)</p>
        <ul className={styles.wrapperTicketsTariff}>
          <li className={styles.styleForTicketsIMG}>
            <article className={styles.TicketsLastMinute}>
              <h3 className={styles.titleLM}>LAST MINUTE</h3>
              <p className={styles.kolPlace}>Залишилось 100 місць</p>
              <ul className={styles.wrapperDetailsTariff}>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-diamond`}></use>
                  </svg>
                  <p className={styles.detailsText}>Місця: позначені зеленим</p>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={38} height={28}>
                    <use xlinkHref={`${sprite}#icon-palms`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    Welcome drink (один келих ігристого) + вода
                  </p>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-people`}></use>
                  </svg>
                  <p className={styles.detailsText}>нетворкінг</p>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-pazzle`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>додаткові приємності:</p>
                    <ul className={styles.wrapperLMList}>
                      <li>
                        Вільне пересування між зонами: великий зал із барними
                        столами та камерний простір із м’якими посадками
                      </li>
                      <li>
                        Частування ігристим - ми подбаємо про святковий настрій
                      </li>
                      <li>Бренд-зона з дегустаціями від наших партнерів</li>
                      <li>Спікери поруч, без бар’єрів</li>
                      <li>Відомі гості - в одному залі, на відстані розмови</li>
                      <li>
                        Професійне фото та відео - якщо не сховаєтесь від камери
                        😉
                      </li>
                      <li>Обійми з тими, кого давно не бачили</li>
                    </ul>
                  </div>
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
              <p className={styles.priceTextWillBe}>
                850pln/ <span>200&euro;</span>
              </p>
              <p className={styles.priceText}>
                770pln /<span>130&euro;</span>
              </p>
              <p className={styles.priceTextAfter}>*підвищення цін з 08.08</p>
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
            </article>
            <img
              src={LastMinuteIMG}
              alt="ticketIMG"
              width={453}
              height={423}
              className={styles.ticketsIMG}
            />
          </li>
          <li className={styles.styleForTicketsIMG}>
            <article className={styles.TicketsGold}>
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
                  <p className={styles.detailsText}>
                    <span>Дві кавопаузи</span>
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
                    <span>
                      Участь у розіграші <br /> подарунків
                    </span>
                  </p>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-pazzle`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    <span>
                      Пакет з подарунками <br /> gold класу
                    </span>
                  </p>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-star`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    <span>-10% знижка на бранч</span>
                    <br />
                    <span className={styles.underPresidentRoomSpan}>
                      наступного дня (24.08.2025)
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
              <p className={styles.priceTextWillBe}>
                1300pln/ <span>300&euro;</span>
              </p>
              <p className={styles.priceText}>
                990pln /<span>230&euro;</span>
              </p>
              <p className={styles.priceTextAfter}>*підвищення цін з 08.08</p>
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
            </article>
            <img
              src={GoldIMG}
              alt="ticketIMG"
              width={453}
              height={527}
              className={styles.ticketsIMG}
            />
          </li>
          <li className={styles.styleForTicketsIMG}>
            <article className={styles.TicketsPremium}>
              <h3 className={styles.titleTariffCard}>premium</h3>
              <p className={styles.kolPlace}>Залишилось 52 місця</p>
              <ul className={styles.wrapperDetailsTariff}>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-diamond`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    Місця: позначені блакитним
                  </p>
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
                    <use xlinkHref={`${sprite}#icon-star`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    <span>-15%</span> знижка на бранч
                    <br />
                    <span className={styles.underPresidentRoomSpan}>
                      наступного дня (24.08.2025)
                    </span>
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
              <p className={styles.priceTextWillBe}>
                1900pln/ <span>450&euro;</span>
              </p>
              <p className={styles.priceText}>
                1400pln /<span>330&euro;</span>
              </p>
              <p className={styles.priceTextAfter}>*підвищення цін з 08.08</p>{" "}
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
            </article>
            <img
              src={PremiumIMG}
              alt="ticketIMG"
              width={453}
              height={421}
              className={styles.ticketsIMG}
            />
          </li>
          <li className={styles.styleForTicketsIMG}>
            <article className={styles.TicketsLuxe}>
              <h3 className={styles.titleTariffCard}>LUXE</h3>
              <p className={styles.kolPlace}>Залишилось 25 місць</p>
              <ul className={styles.wrapperDetailsTariff}>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-diamond`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    Місця: позначені червоним
                  </p>
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
                  <p className={styles.detailsText}>
                    <span>-20%</span> знижка на бранч
                    <br />
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
              <p className={styles.priceText}>
                5000pln /<span>1200&euro;</span>
              </p>{" "}
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
            </article>
            <img
              src={LuxeIMG}
              alt="ticketIMG"
              width={453}
              height={351}
              className={styles.ticketsIMG}
            />
          </li>
        </ul>
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
