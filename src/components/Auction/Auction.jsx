import styles from "./Auction.module.css";

export default function Auction() {
  return (
    <section className={styles.AuctionSection}>
      <div className="container">
        <ul className={styles.wrapperAuction}>
          <li>(Аукціон речей зі змістом)</li>
          <li>Мистецтво, створене серцем. Для тих, хто відчуває глибше</li>
        </ul>
        <div className={styles.wrappertitleAuction}>
          <h4 className={styles.titleAuctionMobile}>Під час конференції</h4>
          <h4
            className={`${styles.titleAuctionMobile} ${styles.titleAuctionMobileMargin}`}
          >
            <span>«Код ЖІНКИ»</span>
          </h4>
          <h4 className={styles.titleAuctionMobile}>
            відбудеться благодійний{" "}
          </h4>
          <h4 className={styles.titleAuctionMobile}>аукціон на </h4>
          <h4
            className={`${styles.titleAuctionMobile} ${styles.titleAuctionMobileMargin2}`}
          >
            підтримку <span>Збройних</span>
          </h4>
          <h4
            className={`${styles.titleAuctionMobile} ${styles.titleAuctionMobileMargin3}`}
          >
            <span className={styles.titleAuctionMobileMarginSpan}>
              Сил України
            </span>
          </h4>
        </div>
        <p className={styles.lastTextTeckets}>
          Ми зібрали ексклюзивні речі з усієї України, створені геніальними
          українськими <br /> майстрами — кожен лот має історію, енергію й
          глибокий сенс
        </p>
      </div>
    </section>
  );
}
