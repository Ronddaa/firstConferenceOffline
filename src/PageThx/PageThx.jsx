import styles from './PageThx.module.css'
import logo from '../components/Footer/logoFooter.svg'

export default function PageThx() {
    return (
      <section className={styles.PageThx}>
        <img src={logo} alt="logo" />
        <h2 className={styles.titleThank}>Ура, ти з нами!</h2>
        <p className={styles.lizText}>І в нас — мурахи по шкірі!</p>

            <div className={styles.wrapperChoiseButtonsTickets}>
                
        </div>
      </section>
    );
}