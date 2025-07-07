import styles from './GoldTicketPage.module.css'
import logo from '../GoldTicketLogo.svg'
import TicketsIMG from '../TicketsIMG.webp'
import ourDress1 from "../ourDress1.webp";
import ourDress2 from '../ourDress2.webp';
import ourDress3 from "../ourDress3.webp";

export default function GoldTicketPage() {
    return (
      <section className={styles.GoldTicketPage}>
        <img className={styles.logo} src={logo} alt="logo" width={328} height={83} />
        <p className={styles.textUnderlogo}>
          Преміальна українсько-європейська <br /> конференція у форматі
          спікер-шоу
        </p>
        <h1 className={styles.titleGoldTicket}>квиток для тарифу «gold»</h1>
        <img className={styles.TicketsIMG} src={TicketsIMG} alt="Ivent Date" width={585} height={305} />
        <h2 className={styles.dressCode}>Дрес-код:</h2>
        <ul className={styles.wrapperNameColor}>
          <li>жовтий</li>
          <li>пастельний блакитний</li>
          <li>білий</li>
        </ul>
        <ul className={styles.wrapperColors}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <p className={styles.colorOurIvent}>кольори нашого заходу</p>
        <ul className={styles.wrapperOurDressIMG}>
          <li>
            <img src={ourDress1} alt="dress" width={147} height={143} />
          </li>
          <li>
            <img src={ourDress2} alt="dress" width={147} height={143} />
          </li>
          <li>
            <img src={ourDress3} alt="dress" width={147} height={143} />
          </li>
        </ul>
        <p className={styles.scanMe}>*заскануй код на конференції</p>
        <div className={styles.qrCodeHere} id='qrCodeHere'></div>
      </section>
    );
}