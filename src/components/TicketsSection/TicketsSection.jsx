import styles from "./TicketsSection.module.css";
import sprite from "../icons.svg";
import TicketsForm from "../Modals/HelperFormUsers/HelperFormUsers";
import { useState } from "react";
import ShowPlace from "../Modals/ShowPlace/ShowPlace";
import LastMinuteIMG from "./LastMinuteIMG.webp";
import GoldIMG from "./GoldIMG.webp";
import PremiumIMG from "./PremiumIMG.webp";
import LuxeIMG from "./LuxeIMG.webp";

const items = [
  "Вільне пересування між зонами: великий зал із барними столами та камерний простір із м’якими посадками",
  "Бренд-зона з дегустаціями від наших партнерів",
  "Спікери поруч, без бар’єрів - відкрите спілкування з експертами",
  "Відомі гості в одному залі, на відстані розмови - можливість познайомитися з лідерами думок",
  "Професійне фото та відео - якщо не сховаєтесь від камери 😉",
  "Обійми з тими, кого давно не бачили",
  "Спеціальні умови для поселення в The WESTIN WARSAW",
  "Доступ до ресторану п’ятизіркового готелю",
  "Доступ до Telegram-каналу з бекстейджем події",
];

export default function Tickets() {
  const [modalTicketsIsOpen, setmodalTickets] = useState(false);
  const [modalShowPlaceIsOpen, setmodalShowPlace] = useState(false);
  const [isExpandedLastMinute, setIsExpandedLastMinute] = useState(false);
  const [isExpandedGold, setIsExpandedGold] = useState(false);
  const [isExpandedPremium, setIsExpandedPremium] = useState(false);
  const [isExpandedLuxe, setIsExpandedLuxe] = useState(false);

  const toggleListLastMinute = () => {
    setIsExpandedLastMinute((prev) => !prev);
  };
const toggleListGold = () => {
  setIsExpandedGold((prev) => !prev);
};const toggleListPremium = () => {
  setIsExpandedPremium((prev) => !prev);
};const toggleListLuxe = () => {
  setIsExpandedLuxe((prev) => !prev);
};
  // Здесь в рендере вычисляем, какие элементы показывать
  const visibleItemsLastMinute = isExpandedLastMinute ? items : items.slice(0, 2);
  const visibleItemsGold = isExpandedGold ? items : items.slice(0, 2);
  const visibleItemsPremium = isExpandedPremium ? items : items.slice(0, 2);
  const visibleItemsLuxe = isExpandedLuxe ? items : items.slice(0, 2);
  return (
    <section className={styles.sectionTickets} id="ticketsSectionAnchor">
      <div className="container">
        <p className="btwSectionText">(тарифи на участь)</p>
        <ul className={styles.wrapperTicketsTariff}>
          <li className={styles.styleForTicketsIMG}>
            <article className={styles.TicketsLastMinute}>
              <h3 className={styles.titleLM}>LAST MINUTE</h3>
              <p className={styles.kolPlace}>SOLD OUT</p>
              <ul className={styles.wrapperDetailsTariff}>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-diamond`}></use>
                  </svg>
                  <p className={styles.detailsText}>Місця: позначені зеленим</p>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-palms`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>
                      Welcome drink (один келих ігристого) + вода
                    </p>
                    <ul className={styles.wrapperLMList}>
                      <li>
                        Один келих ігристого вина + вода для створення
                        святкового настрою
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-people`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>нетворкінг</p>
                    <ul className={styles.wrapperLMList}>
                      <li>
                        можливість познайомитися з іншими учасниками поза межами
                        головного залу
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-podkova`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>Лекційна мала зала:</p>
                    <ul className={styles.wrapperLMList}>
                      <li>
                        можливість послухати лекції від експертів у своїх нішах
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-infinity`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>додаткові приємності:</p>
                    <ul className={styles.wrapperLMList}>
                      {visibleItemsLastMinute.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <button
                      className={styles.detailsBtn}
                      onClick={toggleListLastMinute}
                    >
                      {isExpandedLastMinute ? "Згорнути" : "Детальніше"}
                    </button>
                  </div>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-starsthree`}></use>
                  </svg>
                  <p className={styles.detailsText}>Дизайнерський показ</p>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-micro`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    Ексклюзивний концерт <br /> MONATIK у рамках <br />
                    конференції «Код Жінки»
                  </p>
                </li>
              </ul>
              <p className={styles.priceTextWillBe}>
                850
                <span className={styles.priceValue}>
                  <span className={styles.priceValue}>
                    <span className={styles.priceValue}>pln</span>
                  </span>
                </span>
                / <span>200&euro;</span>
              </p>
              <p className={styles.priceText}>
                sold out                
              </p>
              <button
                className={styles.btnBuyTariffGold}
                onClick={() => {
                  setmodalTickets(true);
                }}
                disabled
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
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-diamond`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>
                      Місця: позначені жовтим
                    </p>
                    <ul className={styles.wrapperLMList}>
                      <li>
                        <span className={styles.colorBlueLi}>
                          за банкетними столами
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-palms`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>Welcome drink</p>
                    <ul className={styles.wrapperLMList}>
                      <li>
                        один келих ігристого вина + вода для створення
                        святкового настрою
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-clock`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>
                      <span>Кавопаузи:</span>
                    </p>
                    <ul className={styles.wrapperLMList}>
                      <li>дві можливості відпочити під час перерви</li>
                    </ul>
                  </div>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-people`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>Нетворкінг </p>
                    <ul className={styles.wrapperLMList}>
                      <li>
                        можливість познайомитися з іншими учасниками поза межами
                        головного залу
                      </li>
                    </ul>
                  </div>
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
                    <span>-10% знижка на бранч від MGVC</span>
                    <br />
                    <span className={styles.underPresidentRoomSpan}>
                      наступного дня (24.08.2025)
                    </span>
                  </p>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-podkova`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>Лекційна мала зала:</p>
                    <ul className={styles.wrapperLMList}>
                      <li>
                        можливість послухати лекції від експертів у своїх нішах
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-infinity`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>додаткові приємності:</p>
                    <ul className={styles.wrapperLMList}>
                      {visibleItemsGold.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <button
                      className={styles.detailsBtn}
                      onClick={toggleListGold}
                    >
                      {isExpandedGold ? "Згорнути" : "Детальніше"}
                    </button>
                  </div>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-starsthree`}></use>
                  </svg>
                  <p className={styles.detailsText}>Дизайнерський показ</p>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-micro`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    Ексклюзивний концерт <br /> MONATIK у рамках <br />
                    конференції «Код Жінки»
                  </p>
                </li>
              </ul>
              <p className={styles.priceTextWillBe}>
                1300
                <span className={styles.priceValue}>
                  <span className={styles.priceValue}>
                    <span className={styles.priceValue}>pln</span>
                  </span>
                </span>
                / <span>300&euro;</span>
              </p>
              <p className={styles.priceText}>
                990
                <span className={styles.priceValue}>
                  <span className={styles.priceValue}>
                    <span className={styles.priceValue}>pln</span>
                  </span>
                </span>{" "}
                /<span className={styles.priceEuro}>230&euro;</span>
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
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-diamond`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>
                      Місця: позначені блакитним
                    </p>
                    <ul className={styles.wrapperLMList}>
                      <li>за банкетними столами</li>
                    </ul>
                  </div>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-palms`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>Welkome drink</p>
                    <ul className={styles.wrapperLMList}>
                      <li>
                        один келих ігристого вина + вода для створення
                        святкового настрою
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-clock`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>
                      Дві кавопаузи
                      <span>+ асортимент смачних частувань:</span>
                    </p>
                    <ul className={styles.wrapperLMList}>
                      <li>три можливості відпочити під час перерви</li>
                    </ul>
                  </div>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-people`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>Нетворкінг </p>
                    <ul className={styles.wrapperLMList}>
                      <li>
                        можливість познайомитися з іншими учасниками поза межами
                        головного залу
                      </li>
                    </ul>
                  </div>
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
                    <span>-15%</span> знижка на бранч <br /> від MGVC
                    <br />
                    <span className={styles.underPresidentRoomSpan}>
                      наступного дня (24.08.2025)
                    </span>
                  </p>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-podkova`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>Лекційна мала зала:</p>
                    <ul className={styles.wrapperLMList}>
                      <li>
                        можливість послухати лекції від експертів у своїх нішах
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-infinity`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>додаткові приємності:</p>
                    <ul className={styles.wrapperLMList}>
                      {visibleItemsPremium.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <button
                      className={styles.detailsBtn}
                      onClick={toggleListPremium}
                    >
                      {isExpandedPremium ? "Згорнути" : "Детальніше"}
                    </button>
                  </div>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-starsthree`}></use>
                  </svg>
                  <p className={styles.detailsText}>Дизайнерський показ</p>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={52} height={52}>
                    <use xlinkHref={`${sprite}#icon-blackHole`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    <span>
                      Ігристе перед концертом: келих щоб налаштуватись на вечір
                    </span>
                  </p>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-micro`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    Ексклюзивний концерт <br /> MONATIK у рамках <br />
                    конференції «Код Жінки»
                  </p>
                </li>
              </ul>
              <p className={styles.priceText}>
                1900
                <span className={styles.priceValue}>
                  <span className={styles.priceValue}>
                    <span className={styles.priceValue}>pln</span>
                  </span>
                </span>{" "}
                /<span className={styles.priceEuro}>450&euro;</span>
              </p>
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
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-diamond`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>
                      Місця: позначені червоним
                    </p>
                    <ul className={styles.wrapperLMList}>
                      <li>за банкетними столами</li>
                    </ul>
                  </div>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-palms`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    <span>безлімітне ігристе + вода</span>
                  </p>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={60} height={60}>
                    <use xlinkHref={`${sprite}#icon-clock`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    <span>
                      Окрема зала з безперервним доступом до напоїв та
                      асортименту смачних <br /> частувань
                    </span>
                  </p>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-hands`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    <span>
                      Обід зі спікерами за <br /> банкетною посадкою
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
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-fire`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>
                      <span>Відомі гості в окремому Luxe-просторі</span>
                    </p>
                    <ul className={styles.wrapperLMList}>
                      <li>
                        на відстані розмови - можливість познайомитися з
                        лідерами думок
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-pazzle`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    <span>Подарунки Luxe-класу від ексклюзивних партнерів</span>
                  </p>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-coins`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    <span>
                      Знижка -20% на <br /> наступну конференцію
                    </span>
                  </p>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-podkova`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>Лекційна мала зала:</p>
                    <ul className={styles.wrapperLMList}>
                      <li>
                        можливість послухати лекції від експертів у своїх нішах
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-star`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    <span>-20%</span> знижка на бранч від MGVC
                    <br />
                    <span className={styles.underPresidentRoomSpan}>
                      наступного дня (24.08.2025)
                    </span>
                  </p>
                </li>
                <li className={styles.LMwithList}>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-infinity`}></use>
                  </svg>
                  <div className={styles.wrapperLMwithList}>
                    <p className={styles.detailsText}>додаткові приємності:</p>
                    <ul className={styles.wrapperLMList}>
                      {visibleItemsLuxe.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <button
                      className={styles.detailsBtn}
                      onClick={toggleListLuxe}
                    >
                      {isExpandedLuxe ? "Згорнути" : "Детальніше"}
                    </button>
                  </div>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-starsthree`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    Дизайнерський показ <span>із посадковими місцями</span>
                  </p>
                </li>
                <li>
                  <svg className={styles.detailsSVG} width={28} height={28}>
                    <use xlinkHref={`${sprite}#icon-micro`}></use>
                  </svg>
                  <p className={styles.detailsText}>
                    Ексклюзивний концерт <br /> MONATIK у рамках <br />
                    конференції «Код Жінки»
                  </p>
                </li>
              </ul>
              <p className={styles.priceText}>
                5000
                <span className={styles.priceValue}>
                  <span className={styles.priceValue}>
                    <span className={styles.priceValue}>pln</span>
                  </span>
                </span>{" "}
                /<span className={styles.priceEuro}>1200&euro;</span>
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
