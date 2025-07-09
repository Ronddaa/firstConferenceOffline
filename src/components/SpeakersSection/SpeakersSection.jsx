import { useState, useEffect, useMemo } from "react";
import styles from "./SpeakersSection.module.css";
import sprite from "../icons.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar, FreeMode } from "swiper/modules";

// Хук для определения slidesPerView в зависимости от ширины экрана
function useSlidesPerView() {
  const getSlides = () => {
    const width = window.innerWidth;
    if (width < 768) return 1.02;
    if (width < 1024) return 2;
    return 3.05;
  };

  const [slidesPerView, setSlidesPerView] = useState(getSlides());

  useEffect(() => {
    const handleResize = () => setSlidesPerView(getSlides());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return slidesPerView;
}

// Хук для проверки, что устройство — desktop
function useIsDesktop() {
  const getIsDesktop = () => window.innerWidth >= 1024;
  const [isDesktop, setIsDesktop] = useState(getIsDesktop());

  useEffect(() => {
    const handleResize = () => setIsDesktop(getIsDesktop());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
}

export default function SpeakersSection() {
  const [activeSpeakerId, setActiveSpeakerId] = useState(null);
  const slidesPerView = useSlidesPerView();
  const isDesktop = useIsDesktop();

  const toggleDetails = (id) => {
    setActiveSpeakerId((prev) => (prev === id ? null : id));
  };

  const swiperModules = useMemo(() => {
    return isDesktop ? [Scrollbar, FreeMode] : [Scrollbar];
  }, [isDesktop]);

  const speakers = [
    {
      id: 1,
      speakerName: "толстікова\nкатерина",
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
      speakerName: "козачкова\nюлія",
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
      speakerName: "Матюшевська\nАнастасія-Олімпія",
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
      speakerName: "Козлова\nКатерина",
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
      speakerName: "Безбородих\nОлена",
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
      speakerName: "Стрипко\nТаня",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground6",
      speakerInstagram:
        "https://www.instagram.com/todorivaaa?igsh=MXBxamM1YzlnMmxxMg%3D%3D&utm_source=qr",
      speakerClass: "speakerNameClass6",
      numberOfSpeaker: "(06)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Підприємиця з досвідом на трьох континентах: відкривала салони краси в таких країнах, як - Україна, Італія, Канада. Продюсер, власниця продюсерської агенції - заробила за 2 роки собі і експертам запуски на 1000000+$. Навчаю запускати навчальні проєкти, створювати  бренди з нуля. Запускаю експертів, які не просто красиво говорять, а дорого продають, власниця продюсерської агенції.",
    },
    {
      id: 7,
      speakerName: "Щигрова\nЄвгенія",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground7",
      speakerInstagram: "https://www.instagram.com/j.a.n.e_she/",
      speakerClass: "speakerNameClass7",
      numberOfSpeaker: "(07)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Дипломований спеціаліст у галузі «Фізична реабілітація» , персональний Тренер напрямку Stretching міжнародного рівня, власниця Online студії Jane System, спеціаліст з фітнес консалтінгу",
    },
    {
      id: 8,
      speakerName: "Токар\nЯна",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground8",
      speakerInstagram:
        "https://www.instagram.com/dr.yana_tokar_?igsh=YTd1cmMwcXJ3MHhv",
      speakerClass: "speakerNameClass8",
      numberOfSpeaker: "(08)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        'Дерматологиня, хірургиня, доктор медицини, незалежний експерт світових брендів, спікер міжнародних конгресів, автор книги "Сонячна контрацепція" та YouTube каналу "не косметолог, а ЛІКАР", засновниця University of aesthetic medicine, спікер Польського інституту естетичної медицини.',
    },
    {
      id: 9,
      speakerName: "Шотропа\nМішель",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground9",
      speakerInstagram:
        "https://www.instagram.com/mishel_shotropa?igsh=MTQycHk2OWZtNHV5cg==",
      speakerClass: "speakerNameClass9",
      numberOfSpeaker: "(09)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        'Власниця маркетингової та PR-компанії "SHOTROPA MEDIA". 11 років у бізнесі. CEO "INSTAHACKS" - перше міжнародне комʼюніті для експертів. Співпрацюю з CHELSEA. Більше 4000+ учнів моїх навчальних програм по цілому світу',
    },
    {
      id: 12,
      speakerName: "це ще не все!\nочікуй інформацію!",
      speakerTema: "",
      swiperSlideBackground: "swiperSlideBackground12",
      speakerInstagram: "",
      speakerClass: "speakerNameClassLast",
      numberOfSpeaker: "(10)",
      moreInfoBtnClass: "moreInfoBtnDisplayNone",
      contentDetails: "",
    },
  ];

  return (
    <section className={styles.SpeakersSection} id="speakersSection">
      <p className={styles.textBtwSection}>(наші спікери)</p>
      <div className="container">
        <Swiper
          scrollbar={{ hide: false }}
          modules={swiperModules}
          spaceBetween={20}
          slidesPerView={slidesPerView}
          className="mySwiper"
          freeMode={isDesktop}
        >
          {speakers.map((speaker) => (
            <SwiperSlide
              key={speaker.id}
              className={`${styles[speaker.swiperSlideBackground]} ${
                styles.slideWrapper
              }`}
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
    </section>
  );
}