import styles from "./HotelSection.module.css";
import westinhotel from "./westinHotel.webp";
import programBackgroundSvg1 from "./programBackgroundSvg1.svg";

export default function HotelSection() {
  return (
    <section className={styles.HotelSection}>
      <img
        className={styles.programBackgroundSvg1}
        src={programBackgroundSvg1}
        alt="programBackgroundSvg1"
        width={491}
        height={458}
      />
      <ul className={styles.wrapperDateInfo}>
        <li>
          <p className={styles.date}>08</p>
          <p className={styles.mounth}>листопада</p>
        </li>
        <li>
          <img
            className={styles.westinhotelIMG}
            src={westinhotel}
            alt="Hotel"
          />
        </li>
      </ul>
    </section>
  );
}
