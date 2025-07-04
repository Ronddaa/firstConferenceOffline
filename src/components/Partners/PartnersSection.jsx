import styles from "./PartnersSection.module.css";
import spriteLogo from "./spriteLogo.svg";

export default function PartnersSection() {
  return (
    <section className={styles.PartnersSection} id="partnersSection">
      <div className="container">
        <p className={styles.textBtw}>(наші партнери)</p>
        <ul className={styles.wrapperPartners}>
          <li>
            <svg className={styles.pdpLogo} width={223} height={40}>
              <use xlinkHref={`${spriteLogo}#logo-pdp`}></use>
            </svg>
          </li>
        </ul>
      </div>
    </section>
  );
}
