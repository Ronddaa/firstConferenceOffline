import styles from './Hero.module.css'
import TicketsForm from '../Modals/Tickets/TicketsForm';
import { useState } from 'react';

export default function Hero() {
  const [modalTicketsIsOpen, setmodalTickets] = useState(false);
    return (
      <section className={styles.sectionHero}>
        <div className="container">
          <h1 className={styles.mainTitle}>КОД ЖІНКИ</h1>
          <p className={styles.detailsTextHero1}>
            Преміальна українсько-європейська <br /> конференція у форматі
            спікер-шоу
          </p>
          <h2 className={styles.titlePlace}>варшава</h2>
          <p className={styles.detailsTextHero2}>
            до Дня Незалежності —<br /> для тих, хто творить майбутнє
          </p>
          <button
            className={styles.buyBtnHero}
            onClick={() => {
              setmodalTickets(true);
            }}
          >
            придбати квиток
          </button>
        </div>
        <div className={styles.backgrondShadow}></div>
        <TicketsForm
          isOpen={modalTicketsIsOpen}
          onClose={() => setmodalTickets(false)}
        ></TicketsForm>
      </section>
    );
}