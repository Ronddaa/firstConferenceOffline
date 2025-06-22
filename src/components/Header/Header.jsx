import logo from "../../../public/logo.svg";
import styles from "./Header.module.css";
import sprite from "../icons.svg";
import SpeakersForm from "../Modals/Speakers/SpeakersForm";
import { useState } from "react";

export default function Header() {
  
  // const [modalLogInIsOpen, setModalLogIn] = useState(false);
  const [modalSpeakersIsOpen, setmodalSpeakers] = useState(false)

  return (
    <header>
      <div className="container">
        <img
          className={styles.logoHeader}
          src={logo}
          alt="logo"
          width={188}
          height={103}
        />
        <ul className={styles.wrapperNavigationHeader}>
          <li>
            <a href="#" className={styles.headerNavigationLink}>
              про конференцію
            </a>
            <a href="#" className={styles.headerNavigationLink}>
              тарифи
            </a>
            <a href="#" className={styles.headerNavigationLink}>
              анонси
            </a>
          </li>
          <li>
            <a href="#" className={styles.headerNavigationLink}>
              благодійність
            </a>
            <a href="#" className={styles.headerNavigationLink}>
              FAQ
            </a>
            <a href="#" className={styles.headerNavigationLink}>
              контакти
            </a>
          </li>
          <li className={styles.absolutePlaceholder}></li>
        </ul>
        <button className={styles.buyBtnHeader}>
          придбати квиток{" "}
          <svg className={styles.arrowList} width={21} height={21}>
            <use xlinkHref={`${sprite}#icon-arrow`}></use>
          </svg>
        </button>
        <div className={styles.wrapperBurger}>
          <svg className={styles.burgerMenu} width={40} height={40}>
            <use xlinkHref={`${sprite}#icon-burger-menu`}></use>
          </svg>
        </div>
      </div>
      <ul className={styles.wrapperPartnersBtn}>
        <li>
          <button className={styles.partnersBtn} onClick={() => {setmodalSpeakers(true)}}>Стати спікером</button>
        </li>
        <li>
          <button className={styles.partnersBtn}>Стати партнером</button>
        </li>
      </ul>
      <SpeakersForm
        isOpen={modalSpeakersIsOpen}
        onClose={() => setmodalSpeakers(false)}
      ></SpeakersForm>
    </header>
  );
}
