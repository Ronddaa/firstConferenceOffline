import styles from './ProgramOnConference.module.css'

export default function ProgramOnConference() {
    return (
      <section
        className={styles.sectionProgramOnConference}
        id="sectionProgramOnConference"
      >
        <div className="container">
          <p className={styles.btwSectionText}>(програма конференції)</p>
          <h2 className={styles.titlePOC}>інформація буде доступна згодом</h2>
        </div>
      </section>
    );
}