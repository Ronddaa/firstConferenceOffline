import styles from './OurValuesMobile.module.css'
import { useState } from 'react'
import { ourValues } from '../ourValues'

export default function OurValuesMobile() {

    const [activeItem, setActiveItem] = useState(null)

    const handleItemClick = (id) => {
        setActiveItem(activeItem === id ? null : id)
    }

    return (
      <section className={styles.OurValuesMobileSection}>
          <p className={styles.textBtw}>(наші цінності)</p>
                <ul className={styles.wrapperItemsList}>
                    {ourValues.map((item) => {
                        const isActive = activeItem === item.id

                        return (
                          <li
                            key={item.id}
                            onClick={() => handleItemClick(item.id)}
                            className={styles.itemsList}
                          >
                            <p className={styles.number}>{item.number}</p>

                            <div className={styles.wrapperTitle}>
                              <h2
                                className={styles.titleList}
                                dangerouslySetInnerHTML={{ __html: item.title }}
                              />
                                    <span className={styles.openClosePlus}>{isActive ? "-" : "+"}</span>
                            </div>
                            <div
                              className={`${styles.content} ${
                                isActive ? styles.show : ""
                              }`}
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