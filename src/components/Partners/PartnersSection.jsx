import styles from "./PartnersSection.module.css";
import { useState } from "react";
import PartnersForm from "../Modals/Partners/PartnersForm";
import spriteLogo from "./spriteLogo.svg";
import ULEADLogo from "./ULEADLogo.png";

export default function PartnersSection() {
  const [modalPartnersIsOpen, setmodalPartners] = useState(false);
  return (
    <section className={styles.PartnersSection} id="partnersSectionAnchor">
      <div className="container">
        <p className={styles.textBtw}>(наші партнери)</p>
        <ul className={styles.wrapperPartners}>
          <li className={styles.wrapperLogoPDP}>
            <svg className={styles.pdpLogo} width={223} height={40}>
              <use xlinkHref={`${spriteLogo}#logo-pdp`}></use>
            </svg>
          </li>
          <li className={styles.wrapperLogoLavande}>
            <svg className={styles.lavandeLogo} width={382} height={205}>
              <use xlinkHref={`${spriteLogo}#logo-lavande`}></use>
            </svg>
          </li>
          <li className={styles.wrapperLogoConciergePro}>
            <svg className={styles.ConciergeProLogo} width={202} height={165}>
              <use xlinkHref={`${spriteLogo}#logo-conciergepro`}></use>
            </svg>
          </li>
          <li className={styles.wrapperLogoConciergePro}>
            <img src={ULEADLogo} alt="ULEADLogo" />
          </li>
        </ul>
        <button className={styles.goPartnersBtn} onClick={() => setmodalPartners(true)}>стати партнером</button>
      </div>
      <PartnersForm
        isOpen={modalPartnersIsOpen}
        onClose={() => setmodalPartners(false)}
      />
    </section>
  );
}
