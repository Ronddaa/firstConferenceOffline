import styles from "./HeaderComp.module.css";
import SpeakersForm from "../../Modals/Speakers/SpeakersForm";
import PartnersForm from "../../Modals/Partners/PartnersForm";
import TicketsForm from "../../Modals/HelperFormUsers/HelperFormUsers";
import sprite from "../../icons.svg";
import { useState, useEffect } from "react";

export default function HeaderComp() {
  const [modalSpeakersIsOpen, setModalSpeakers] = useState(false);
  const [modalPartnersIsOpen, setModalPartners] = useState(false);
  const [modalTicketsIsOpen, setModalTickets] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Следим за направлением прокрутки
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Скрываем хедер при прокрутке вниз, показываем при прокрутке вверх
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // вниз — прячем
      } else {
        setIsVisible(true); // вверх — показываем
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`${styles.header} ${!isVisible ? styles.hideHeader : ""}`}
    >
      <div className="container">
        <a href="#">
          <img
            src="/logo.svg"
            alt="Warsaw Kod Zhinky"
            width={150}
            height={70}
          />
        </a>
        <ul className={styles.wrapperNavigationList}>
          <li>
            <a
              href="#AboutConferenceSectionAnchor"
              className={styles.navigationLinkHeader}
            >
              про конференцію
            </a>
          </li>
          <li>
            <a
              href="#speakersSectionAnchor"
              className={styles.navigationLinkHeader}
            >
              наші спікери
            </a>
          </li>
          <li>
            <a
              href="#sectionProgramOnConferenceAnchor"
              className={styles.navigationLinkHeader}
            >
              програма
            </a>
          </li>
          <li>
            <a
              href="#ticketsSectionAnchor"
              className={styles.navigationLinkHeader}
            >
              тарифи
            </a>
          </li>
          <li>
            <a
              href="#partnersSectionAnchor"
              className={styles.navigationLinkHeader}
            >
              партнери
            </a>
          </li>
          <li>
            <a
              href="#donationSectionAnchor"
              className={styles.navigationLinkHeader}
            >
              благодійність
            </a>
          </li>
          <li>
            <a href="#FAQSectionAnchor" className={styles.navigationLinkHeader}>
              FAQ
            </a>
          </li>
          <li>
            <a href="#footer" className={styles.navigationLinkHeader}>
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
          className={styles.buyBtnHeader}
          onClick={() => setModalTickets(true)}
        >
          залишити заявку
          <svg className={styles.arrowList} width={21} height={21}>
            <use xlinkHref={`${sprite}#icon-arrow`} />
          </svg>
        </button>
      </div>

      {/* Модалки */}
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
    </header>
  );
}
