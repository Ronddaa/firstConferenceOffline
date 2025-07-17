import styles from './OurValuesDesctop.module.css'
import { ourValues } from "../ourValues";

export default function OurValuesDesctop() {
    return (
      <section className={styles.OurValuesDesctopSection}>
        <p className={styles.textBtw}>(наші цінності)</p>
        <ul className={styles.wrapperItemsList}>
                            {ourValues.map((item) => {
        
                                return (
                                  <li
                                    key={item.id}
                                    className={styles.itemsList}
                                  >
                                    <p className={styles.number}>{item.number}</p>
        
                                      <h2
                                        className={styles.titleList}
                                        dangerouslySetInnerHTML={{ __html: item.title }}
                                      />
                                    <div
                                      className={styles.content}
                                    >
                                      <p className={styles.contentText}>
                                        {item.content}
                                      </p>
                                    </div>
                                  </li>
                                );
                            })}
                  </ul>
      </section>
    );
}