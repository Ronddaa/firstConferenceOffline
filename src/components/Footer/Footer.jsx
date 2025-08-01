import styles from "./Footer.module.css";
import logo from "./logoFooter.svg";
import sprite from "../icons.svg";
import SpeakersForm from "../Modals/Speakers/SpeakersForm";
import { useState } from "react";
import PartnersForm from "../Modals/Partners/PartnersForm";
import TicketsForm from "../Modals/Tickets/TicketsForm";
import BurgerMenu from "../Modals/BurgerMenu/BurgerMenu";

export default function Footer() {
  // const [modalLogInIsOpen, setModalLogIn] = useState(false);
  const [modalSpeakersIsOpen, setmodalSpeakers] = useState(false);
  const [modalPartnersIsOpen, setmodalPartners] = useState(false);
  const [modalTicketsIsOpen, setmodalTickets] = useState(false);
  const [modalBurgerMenuIsOpen, setmodalBurgerMenu] = useState(false);

  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
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
        <div
          className={styles.wrapperBurger}
          onClick={() => setmodalBurgerMenu(true)}
        >
          <svg className={styles.burgerMenu} width={40} height={40}>
            <use xlinkHref={`${sprite}#icon-burger-menu`}></use>
          </svg>
        </div>
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
            href="https://t.me/womenkod_bot"
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
      <h2 className={styles.titleFooter}>КОД ЖІНКИ</h2>
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
      <BurgerMenu
        isOpen={modalBurgerMenuIsOpen}
        onClose={() => setmodalBurgerMenu(false)}
      ></BurgerMenu>
    </footer>
  );
}
