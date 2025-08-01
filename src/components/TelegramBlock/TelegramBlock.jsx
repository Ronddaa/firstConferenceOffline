import styles from "./TelegramBlock.module.css";

export default function TelegramBlock() {
  return (
    <section
      className={styles.sectionTelegramBlock}
      id="sectionTelegramBlockAnchor"
    >
      <div className="container">
        <h2 className={styles.titleTelegram}>Telegram</h2>
        <div className={styles.wrapperTelegramInfo}>
          <h3 className={styles.scndTitle}>канал</h3>
          <p className={styles.telegramText}>
            Хочеш бути в курсі <span>всіх анонсів </span> і бекстейджу
            <span> підготовки?</span>
          </p>
          <a
            className={styles.linkToTelegramBot}
            href="#sectionTelegramBlockAnchor"
            onClick={(e) => {
              e.preventDefault();
              const uniqueStart = `site_${Date.now()}`;
              window.open(
                `https://t.me/womenkod_bot?start=${uniqueStart}`,
                "_blank"
              );
            }}
          >
            підписатись
          </a>
        </div>
      </div>
    </section>
  );
}
