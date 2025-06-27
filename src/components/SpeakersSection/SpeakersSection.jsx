import styles from "./SpeakersSection.module.css";
import sprite from "../icons.svg";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";

import { Scrollbar } from "swiper/modules";

export default function SpeakersSection() {
  const speakers = [
    {
      id: 1,
      speakerName: "толстікова катерина",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground1",
      speakerInstagram:
        "https://www.instagram.com/dr.tolstikova?igsh=d2J6Mjg1OTRnMmk5",
      swiperClass: "",
      speakerNameClass: "speakerNameClass1",
      numberOfSpeaker: "(01)",
      moreInfoBtnClass: "moreInfoBtnDisplayNone",
    },
    {
      id: 2,
      speakerName: "козачкова юлія",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground2",
      speakerInstagram:
        "https://www.instagram.com/kozachkova_yuliia?igsh=MXZmbjVxeXY1eHlrMQ==",
      swiperClass: "",
      speakerNameClass: "speakerNameClass2",
      numberOfSpeaker: "(02)",
      moreInfoBtnClass: "moreInfoBtnDisplayNone",
    },
    {
      id: 3,
      speakerName: "Матюшевська Анастасія - Олімпія",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground3",
      speakerInstagram:
        "https://www.instagram.com/anastasia.olimpia.matushevska?igsh=MTU1bWZoa3MzNmkwaA==",
      swiperClass: "",
      speakerNameClass: "speakerNameClass3",
      numberOfSpeaker: "(03)",
      moreInfoBtnClass: "moreInfoBtn",
    },
    {
      id: 4,
      speakerName: "Козлова Катерина",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground4",
      speakerInstagram:
        "https://www.instagram.com/kozlova.katja?igsh=cHMwMXI2dW9jcGhy&utm_source=qr",
      swiperClass: "",
      speakerNameClass: "speakerNameClass4",
      numberOfSpeaker: "(04)",
      moreInfoBtnClass: "moreInfoBtn",
    },
    {
      id: 5,
      speakerName: "Безбородих Олена",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground5",
      speakerInstagram:
        "https://www.instagram.com/lenabezb?igsh=bDVmZXR1OWoxdXc1",
      swiperClass: "",
      speakerNameClass: "speakerNameClass5",
      numberOfSpeaker: "(05)",
      moreInfoBtnClass: "moreInfoBtn",
    },
  ];

  return (
    <section className={styles.SpeakersSection}>
      <div className="container">
        <Swiper
          scrollbar={{ hide: true }}
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
              <div className={styles.wrapperSpeakerInfo}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles[speaker.speakerNameClass]}
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
                <button className={styles[speaker.moreInfoBtnClass]}>детальніше</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
