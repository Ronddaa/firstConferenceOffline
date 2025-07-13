import styles from './AboutConference.module.css'

export default function AboutConference() {
    return (
      <section
        className={styles.AboutConferenceSection}
        id="AboutConferenceSectionAnchor"
      >
        <div className="container">
          <p className={styles.btwsectionText}>(Про конференцію)</p>
          <h2 className={styles.titleProgram}>
            створюємо <span>преміальний</span> простір для української спільноти в<span> Європі</span>
          </h2>
        </div>
      </section>
    );
}