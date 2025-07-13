import styles from "./BurgerMenu.module.css";
import sprite from "../../icons.svg";
import Modal from "react-modal";
import logo from "./logoFooter.svg";
import { useState } from "react";
import SpeakersForm from "../Speakers/SpeakersForm";
import PartnersForm from "../Partners/PartnersForm";
import TicketsForm from "../Tickets/TicketsForm";

export default function BurgerMenu({ isOpen, onClose }) {
  const [modalSpeakersIsOpen, setmodalSpeakers] = useState(false);
  const [modalPartnersIsOpen, setmodalPartners] = useState(false);
  const [modalTicketsIsOpen, setmodalTickets] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={styles.modalBurgerMenu}
      className={styles.modalContentBurgerMenu}
      closeTimeoutMS={1}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div onClick={onClose} className={styles.wrapperBurgerMenu}>
        <svg className={styles.burgerMenuClose} width={12} height={12}>
          <use xlinkHref={`${sprite}#icon-close`}></use>
        </svg>
      </div>
      <div className={styles.wrapperBurgerHeader}>
        <img
          className={styles.logoFooter}
          src={logo}
          alt="logo"
          width={98}
          height={54}
        />
        <button
          className={styles.buyBtnFooter}
          onClick={() => {
            setmodalTickets(true);
          }}
        >
          придбати квиток{" "}
          <svg className={styles.arrowList} width={21} height={21}>
            <use xlinkHref={`${sprite}#icon-arrow`}></use>
          </svg>
        </button>
      </div>
      <ul className={styles.wrapperPartnersBtn}>
        <li>
          <button
            className={styles.partnersBtn}
            onClick={() => {
              setmodalSpeakers(true);
            }}
          >
            Стати спікером
          </button>
        </li>
        <li>
          <button
            className={styles.partnersBtn}
            onClick={() => {
              setmodalPartners(true);
            }}
          >
            Стати партнером
          </button>
        </li>
      </ul>
      <ul className={styles.wrapperNavigationBurgerMenu}>
        <li>
          <a
            className={styles.navigationLink}
            onClick={onClose}
            href="#programSectionAnchor"
          >
            про конференцію
          </a>
        </li>
        <li>
          <a
            className={styles.navigationLink}
            onClick={onClose}
            href="#AboutConferenceSectionAnchor"
          >
            наші спікери
          </a>
        </li>
        <li>
          <a
            className={styles.navigationLink}
            href="#sectionProgramOnConferenceAnchor"
            onClick={onClose}
          >
            програма
          </a>
        </li>
        <li>
          <a
            className={styles.navigationLink}
            href="#ticketsSectionAnchor"
            onClick={onClose}
          >
            тарифи
          </a>
        </li>
        <li>
          <a
            className={styles.navigationLink}
            href="#partnersSectionAnchor"
            onClick={onClose}
          >
            парнетри
          </a>
        </li>
        <li>
          <a
            className={styles.navigationLink}
            href="#donationSectionAnchor"
            onClick={onClose}
          >
            Благодійність
          </a>
        </li>
        <li>
          <a
            className={styles.navigationLink}
            href="#FAQSectionAnchor"
            onClick={onClose}
          >
            FAQ
          </a>
        </li>
        <li>
          <a className={styles.navigationLink} href="#footer" onClick={onClose}>
            контакти
          </a>
        </li>
      </ul>
      <h2 className={styles.titleBurgerMenu}>КОД ЖІНКИ</h2>
      <SpeakersForm
        isOpen={modalSpeakersIsOpen}
        onClose={() => setmodalSpeakers(false)}
      ></SpeakersForm>
      <PartnersForm
        isOpen={modalPartnersIsOpen}
        onClose={() => setmodalPartners(false)}
      ></PartnersForm>
      <TicketsForm
        isOpen={modalTicketsIsOpen}
        onClose={() => setmodalTickets(false)}
      ></TicketsForm>
    </Modal>
  );
}
