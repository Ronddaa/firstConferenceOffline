import styles from './Program.module.css'
import { itemsProgramList } from './itemsProgram.js'

export default function Program() {

    return (
      <section className={styles.ProgramSection}>
        <p className="btwSectionText">(програма конференції)</p>
        <ul className={styles.wrapperItemsProgramList}>
          {itemsProgramList.map((item) => (
            <li className={styles.itemsList} key={item.id}>
              <p className={styles.timeList}>{item.time}</p>
              <h2 className={styles.titleList}>{item.title}</h2>
              <p className={styles.contentText}>{item.contentText}</p>
            </li>
          ))}
        </ul>
      </section>
    );
}