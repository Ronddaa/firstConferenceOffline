import logo from "../../../public/logo.svg";
import styles from "./Header.module.css";
import sprite from "../icons.svg";
import SpeakersForm from "../Modals/Speakers/SpeakersForm";
import { useEffect, useState } from "react";
import PartnersForm from "../Modals/Partners/PartnersForm";
import TicketsForm from "../Modals/Tickets/TicketsForm";
import BurgerMenu from "../Modals/BurgerMenu/BurgerMenu";

export default function Header() {
  const [modalSpeakersIsOpen, setmodalSpeakers] = useState(false);
  const [modalPartnersIsOpen, setmodalPartners] = useState(false);
  const [modalTicketsIsOpen, setmodalTickets] = useState(false);
  const [modalBurgerMenuIsOpen, setmodalBurgerMenu] = useState(false);

  const [scrollDirection, setScrollDirection] = useState(null);
  const [isScrolledTop, setIsScrolledTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Скрыть/показать блок по направлению скролла
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      // Фиксируем, находится ли пользователь в самом верху
      setIsScrolledTop(currentScrollY < 10);

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${!isScrolledTop ? styles.scrolledHeader : ""}`}>
      <div className="container">
        <a href="#">
          <img
            className={styles.logoHeader}
            src={logo}
            alt="logo"
            width={188}
            height={103}
          />
        </a>
        

        <button
          className={styles.buyBtnHeader}
          onClick={() => setmodalTickets(true)}
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

      {/* Блок с кнопками "Стати спікером / партнером" */}
      <ul
        className={`${styles.wrapperPartnersBtn} ${
          scrollDirection === "down" ? styles.hidePartnersBtn : ""
        }`}
      >
        <li>
          <button
            className={styles.partnersBtn}
            onClick={() => setmodalSpeakers(true)}
          >
            Стати спікером
          </button>
        </li>
        <li>
          <button
            className={styles.partnersBtn}
            onClick={() => setmodalPartners(true)}
          >
            Стати партнером
          </button>
        </li>
      </ul>

      <SpeakersForm
        isOpen={modalSpeakersIsOpen}
        onClose={() => setmodalSpeakers(false)}
      />
      <PartnersForm
        isOpen={modalPartnersIsOpen}
        onClose={() => setmodalPartners(false)}
      />
      <TicketsForm
        isOpen={modalTicketsIsOpen}
        onClose={() => setmodalTickets(false)}
      />
      <BurgerMenu
        isOpen={modalBurgerMenuIsOpen}
        onClose={() => setmodalBurgerMenu(false)}
      />
    </header>
  );
}
