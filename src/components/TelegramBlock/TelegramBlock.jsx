import styles from './TelegramBlock.module.css'

export default function TelegramBlock() {
    return (
      <section className={styles.sectionTelegramBlock}>
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
              href="https://t.me/warsawkod_bot?start=warsawkod"
              target="_blank"
              rel="noopener noreferrer"
            >
              підписатись
            </a>
          </div>
        </div>
      </section>
    );
}