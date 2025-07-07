import styles from './ShowPlace.module.css'
import sprite from "../../icons.svg";
import Modal from "react-modal";
import showPlaceIMG from './ShowPlace.svg'


export default function ShowPlace({isOpen, onClose}) {
    return (
      <Modal
        isOpen={isOpen}
        overlayClassName={styles.modalShowPlace}
        className={styles.modalShowPlaceContent}
        closeTimeoutMS={400}
        onRequestClose={onClose}
        ariaHideApp={false}
      >
        <svg
          className={styles.closeModalPlaceShow}
          onClick={onClose}
          width={14}
          height={14}
        >
          <use xlinkHref={`${sprite}#icon-close`} />
        </svg>

        <img
          loading="lazy"
          className={styles.showPlaceIMG}
          src={showPlaceIMG}
          alt="showPlace"
          width={600}
          height={400}
        />
      </Modal>
    );
}