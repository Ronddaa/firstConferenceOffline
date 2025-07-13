import styles from './HotelSection.module.css'

export default function HotelSection() {
    return (
        <section>
            <ul className={styles.wrapperDateInfo}>
                <li>
                <p className={styles.date}>23</p>
                <p className={styles.mounth}>серпня</p>
                </li>
                <li>
                <a
                    className={styles.hotelName}
                    target="_blank"
                    href="https://www.marriott.com/en-us/hotels/wawwi-the-westin-warsaw/overview/"
                >
                    Westin hotel
                    <br />
                    Warsaw
                </a>
                </li>
            </ul>
        </section>
    )
}