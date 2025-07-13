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
    <footer className={styles.footer} id="footer">
      <div className="container">
        <img src={logoFooter} alt="Warsaw Kod Zhinky" width={150} height={70} />

        <ul className={styles.wrapperNavigationList}>
          <li>
            <a
              href="#AboutConferenceSectionAnchor"
              className={styles.navigationLinkFooter}
            >
              про конференцію
            </a>
          </li>
          <li>
            <a
              href="#speakersSectionAnchor"
              className={styles.navigationLinkFooter}
            >
              наші спікери
            </a>
          </li>
          <li>
            <a
              href="#sectionProgramOnConferenceAnchor"
              className={styles.navigationLinkFooter}
            >
              програма
            </a>
          </li>
          <li>
            <a
              href="#ticketsSectionAnchor"
              className={styles.navigationLinkFooter}
            >
              тарифи
            </a>
          </li>
          <li>
            <a
              href="#partnersSectionAnchor"
              className={styles.navigationLinkFooter}
            >
              партнери
            </a>
          </li>
          <li>
            <a
              href="#donationSectionAnchor"
              className={styles.navigationLinkFooter}
            >
              благодійність
            </a>
          </li>
          <li>
            <a href="#FAQSectionAnchor" className={styles.navigationLinkFooter}>
              FAQ
            </a>
          </li>
          <li>
            <a href="#footer" className={styles.navigationLinkFooter}>
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
      <ul className={styles.wrapperContactLinks}>
        <li>
          <a
            target="_blank"
            className={styles.contactLink}
            href="tel:+48667994337"
          >
            +48667994337
          </a>
        </li>
        <li>
          <a
            target="_blank"
            className={styles.contactLink}
            href="https://t.me/warsawkod_bot"
          >
            TELEGRAM
          </a>
        </li>
        <li>
          <a
            target="_blank"
            className={styles.contactLink}
            href="https://www.instagram.com/kod.zhinky?igsh=MXFoZHN2dWxoeHMyZw%3D%3D&utm_source=qr"
          >
            INSTAGRAM
          </a>
        </li>
      </ul>
      <div className={styles.wrapperPolicyC}>
        <ul className={styles.wrapperC}>
          <li>2025 &copy;</li>
          <li>Усі права захищені</li>
        </ul>
        <ul className={styles.wrapperPolicy}>
          <li>
            <a className={styles.policyLink} href="#">
              публічна оферта
            </a>
          </li>
          <li>
            <a className={styles.policyLink} href="#">
              Політика конфіденційності
            </a>
          </li>
        </ul>
      </div>
      <h2 className={styles.titleFooter}>КОД ЖІНКИ</h2>
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
