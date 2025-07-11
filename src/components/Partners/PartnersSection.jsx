import styles from "./PartnersSection.module.css";
import spriteLogo from "./spriteLogo.svg";

export default function PartnersSection() {
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
        </ul>
      </div>
    </section>
  );
}
