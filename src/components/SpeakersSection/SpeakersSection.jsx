import { useState } from "react";
import styles from "./SpeakersSection.module.css";
import sprite from "../icons.svg";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";

import { Scrollbar } from "swiper/modules";

export default function SpeakersSection() {
  const [activeSpeakerId, setActiveSpeakerId] = useState(null);

  const toggleDetails = (id) => {
    setActiveSpeakerId((prev) => (prev === id ? null : id));
  };

  const speakers = [
    {
      id: 1,
      speakerName: "толстікова катерина",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground1",
      speakerInstagram:
        "https://www.instagram.com/dr.tolstikova?igsh=d2J6Mjg1OTRnMmk5",
      speakerClass: "speakerNameClass1",
      numberOfSpeaker: "(01)",
      moreInfoBtnClass: "moreInfoBtnDisplayNone",
      contentDetails: "",
    },
    {
      id: 2,
      speakerName: "козачкова юлія",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground2",
      speakerInstagram:
        "https://www.instagram.com/kozachkova_yuliia?igsh=MXZmbjVxeXY1eHlrMQ==",
      speakerClass: "speakerNameClass2",
      numberOfSpeaker: "(02)",
      moreInfoBtnClass: "moreInfoBtnDisplayNone",
      contentDetails: "",
    },
    {
      id: 3,
      speakerName: "Матюшевська Анастасія - Олімпія",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground3",
      speakerInstagram:
        "https://www.instagram.com/anastasia.olimpia.matushevska?igsh=MTU1bWZoa3MzNmkwaA==",
      speakerClass: "speakerNameClass3",
      numberOfSpeaker: "(03)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Психотерапевт, сексолог. Жінка, мама, партнерка, творчиня. Автор програм для майбутніх сексологів та психотерапевтів. Засновниця проєкту  «ЖІНКИ» - серії трансформаційних подій, ретритів і конференцій про глибину, сміливість і жіночу цілісність.",
    },
    {
      id: 4,
      speakerName: "Козлова Катерина",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground4",
      speakerInstagram:
        "https://www.instagram.com/kozlova.katja?igsh=cHMwMXI2dW9jcGhy&utm_source=qr",
      speakerClass: "speakerNameClass4",
      numberOfSpeaker: "(04)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Наставник особистих брендів, автор курсу по проявленості MANIFESTATION COURSE, трансформаційний маркетолог, модель, блогер",
    },
    {
      id: 5,
      speakerName: "Безбородих Олена",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground5",
      speakerInstagram:
        "https://www.instagram.com/lenabezb?igsh=bDVmZXR1OWoxdXc1",
      speakerClass: "speakerNameClass5",
      numberOfSpeaker: "(05)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Магістр бізнес адміністрування, викладач економіки, до війни керувала власним мережовим бізнесом понад 10 років, бакалавр психології, практикуючий психолог, гештальт-терапевт, тілесно-орієнтований терапевт.",
    },
    {
      id: 6,
      speakerName: "це ще не все!\nочікуй інформацію!",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground6",
      speakerInstagram: "",
      speakerClass: "speakerNameClassLast",
      numberOfSpeaker: "(02)",
      moreInfoBtnClass: "moreInfoBtnDisplayNone",
      contentDetails: "",
    },
  ];

  return (
    <section className={styles.SpeakersSection}>
      <p className={styles.textBtwSection}>(наші спікери)</p>
      <div className="container">
        <Swiper
          scrollbar={{ hide: false }}
          modules={[Scrollbar]}
          spaceBetween={20}
          className="mySwiper"
        >
          {speakers.map((speaker) => (
            <SwiperSlide
              key={speaker.id}
              className={styles[speaker.swiperSlideBackground]}
            >
              <p className={styles.numberOfSpeaker}>
                {speaker.numberOfSpeaker}
              </p>

              <div
                className={`${styles.dropUpDetails} ${
                  activeSpeakerId === speaker.id ? styles.active : ""
                }`}
              >
                <p></p>
                <p className={styles.contentDetails}>
                  {speaker.contentDetails}
                </p>
              </div>

              <div className={styles.wrapperSpeakerInfo}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles[speaker.speakerClass]}
                  href={speaker.speakerInstagram}
                >
                  {speaker.speakerName}
                  <div className={styles.wrapperSpeakerInstargram}>
                    <svg className={styles.instagram} width={32} height={32}>
                      <use xlinkHref={`${sprite}#icon-inst`}></use>
                    </svg>
                  </div>
                </a>
                <p className={styles.speakerTema}>{speaker.speakerTema}</p>

                {speaker.moreInfoBtnClass === "moreInfoBtn" && (
                  <button
                    className={styles.moreInfoBtn}
                    onClick={() => toggleDetails(speaker.id)}
                  >
                    {activeSpeakerId === speaker.id ? "згорнути" : "детальніше"}
                  </button>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <svg className={styles.leftRigrh} width={24} height={12}>
        <use xlinkHref={`${sprite}#icon-leftRigrh`}></use>
      </svg>
    </section>
  );
}
