import styles from "./FooterComp.module.css";
import sprite from "../../icons.svg";
import { useState } from "react";
import TicketsForm from "../../Modals/Tickets/TicketsForm";
import SpeakersForm from "../../Modals/Speakers/SpeakersForm";
import PartnersForm from "../../Modals/Partners/PartnersForm";
import logoFooter from '../logoFooter.svg'

export default function FooterComp() {
  const [modalSpeakersIsOpen, setModalSpeakers] = useState(false);
  const [modalPartnersIsOpen, setModalPartners] = useState(false);
  const [modalTicketsIsOpen, setModalTickets] = useState(false);

  return (
    <footer className={styles.FooterComp}>
      <div className="container">
        <img src={logoFooter} alt="Warsaw Kod Zhinky" width={150} height={70} />

        <ul className={styles.wrapperNavigationList}>
          <li>
            <a href="#about" className={styles.navigationLinkFooter}>
              про конференцію
            </a>
          </li>
          <li>
            <a href="#speakersSection" className={styles.navigationLinkFooter}>
              наші спікери
            </a>
          </li>
          <li>
            <a href="#program" className={styles.navigationLinkFooter}>
              програма
            </a>
          </li>
          <li>
            <a href="#tariff" className={styles.navigationLinkFooter}>
              тарифи
            </a>
          </li>
          <li>
            <a href="#partners" className={styles.navigationLinkFooter}>
              партнери
            </a>
          </li>
          <li>
            <a href="#donation" className={styles.navigationLinkFooter}>
              благодійність
            </a>
          </li>
          <li>
            <a href="#faq" className={styles.navigationLinkFooter}>
              FAQ
            </a>
          </li>
          <li>
            <a href="#contacts" className={styles.navigationLinkFooter}>
              контакти
            </a>
          </li>
        </ul>

        <ul className={styles.wrapperSPButtons}>
          <li>
            <button
              className={styles.partnersBtn}
              onClick={() => setModalSpeakers(true)}
            >
              Стати спікером
            </button>
          </li>
          <li>
            <button
              className={styles.partnersBtn}
              onClick={() => setModalPartners(true)}
            >
              Стати партнером
            </button>
          </li>
        </ul>

        <button
          className={styles.buyBtnFooter}
          onClick={() => setModalTickets(true)}
        >
          придбати квиток
          <svg className={styles.arrowList} width={21} height={21}>
            <use xlinkHref={`${sprite}#icon-arrow`} />
          </svg>
        </button>
      </div>
      <TicketsForm
        isOpen={modalTicketsIsOpen}
        onClose={() => setModalTickets(false)}
      />
      <SpeakersForm
        isOpen={modalSpeakersIsOpen}
        onClose={() => setModalSpeakers(false)}
      />
      <PartnersForm
        isOpen={modalPartnersIsOpen}
        onClose={() => setModalPartners(false)}
      />
    </footer>
  );
}
