import styles from "./PartnersSection.module.css";
import { useState } from "react";
import PartnersForm from "../Modals/Partners/PartnersForm";
import spriteLogo from "./spriteLogo.svg";
import AC from './911C.webp';

export default function PartnersSection() {
  const [modalPartnersIsOpen, setmodalPartners] = useState(false);
  return (
    <section className={styles.PartnersSection} id="partnersSectionAnchor">
      <div className="container">
        <p className="btwSectionText">(наші партнери)</p>
        <ul className={styles.wrapperPartners}>
          <li className={styles.wrapperLogoPDP}>
            <a
              target="_blank"
              href="https://www.instagram.com/pied.de.poule_warsaw?igsh=cGIzZWFrZGxuemdu"
              rel="noopener noreferrer"
            >
              <svg className={styles.pdpLogo} width={223} height={40}>
                <use xlinkHref={`${spriteLogo}#logo-pdp`}></use>
              </svg>
            </a>
          </li>
          <li className={styles.wrapperLogoLavande}>
            <a
              href="https://www.instagram.com/lavande.ua?igsh=MTM0Z3RnNGh2MTNpbA=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className={styles.lavandeLogo} width={382} height={205}>
                <use xlinkHref={`${spriteLogo}#logo-lavande`}></use>
              </svg>
            </a>
          </li>
          <li className={styles.wrapperLogoConciergePro}>
            <a
              href="https://t.me/concierge_pro"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className={styles.ConciergeProLogo} width={202} height={165}>
                <use xlinkHref={`${spriteLogo}#logo-conciergepro`}></use>
              </svg>
            </a>
          </li>
          <li className={styles.wrapperLogo911AC}>
            <a
              href="https://www.instagram.com/911_aesthetic_clinic?igsh=MW9yY2hldmZqNGxxaw=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={AC} alt="911 AC" />
            </a>
          </li>
        </ul>
        <button
          className={styles.goPartnersBtn}
          onClick={() => setmodalPartners(true)}
        >
          стати партнером
        </button>
      </div>
      <PartnersForm
        isOpen={modalPartnersIsOpen}
        onClose={() => setmodalPartners(false)}
      />
    </section>
  );
}
