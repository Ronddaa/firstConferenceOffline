import { useState, useEffect, useRef } from "react";
import styles from "./SpeakersSection.module.css";
import sprite from "../icons.svg";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Tolstikova from "./Tolstikova.webp";
import Kozachkova from "./Kozachkova.webp";
import Matushevska from "./Matushevska.webp";
import Kozlova from "./Kozlova.webp";
import Besborodih from "./Besborodih.webp";
import Stripko from "./Stripko.webp";
import Shihrova from "./Shihrova.webp";
import Tokar from "./Tokar.webp";
import Shotropa from "./Shotropa.webp";
import Ask from "./ask.png";

gsap.registerPlugin(ScrollTrigger);

export default function SpeakersSection() {
  const [activeSpeakerId, setActiveSpeakerId] = useState(null);
  const wrapperRef = useRef(null);
  const slidesRef = useRef([]);
  const containerRef = useRef(null);

  const toggleDetails = (id) => {
    setActiveSpeakerId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (!wrapperRef.current || !slidesRef.current.length) return;

    const totalSlides = slidesRef.current.length;
    const container = wrapperRef.current;

    const scrollTween = gsap.to(slidesRef.current, {
      xPercent: -100 * (totalSlides - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => "+=" + container.offsetWidth,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        horizontal: false,
      },
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.kill();
    };
  }, []);

  const speakers = [
    {
      id: 1,
      image: Tolstikova,
      speakerName: "толстікова\nкатерина",
      speakerTema: "Уточнюється",
      speakerInstagram: "https://www.instagram.com/dr.tolstikova",
      speakerClass: "speakerNameClass1",
      numberOfSpeaker: "(01)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails: "Скоро дізнаєтесь про мене трохи більше. =)",
    },
    {
      id: 2,
      image: Kozachkova,
      speakerName: "козачкова\nюлія",
      speakerTema: "Уточнюється",
      speakerInstagram: "https://www.instagram.com/kozachkova_yuliia",
      speakerClass: "speakerNameClass2",
      numberOfSpeaker: "(02)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails: "Скоро дізнаєтесь про мене трохи більше. =)",
    },
    {
      id: 3,
      image: Matushevska,
      speakerName: "Матюшевська\nАнастасія-Олімпія",
      speakerTema: "Уточнюється",
      speakerInstagram:
        "https://www.instagram.com/anastasia.olimpia.matushevska",
      speakerClass: "speakerNameClass3",
      numberOfSpeaker: "(03)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails: "Психотерапевт, сексолог...",
    },
    {
      id: 4,
      image: Kozlova,
      speakerName: "Козлова\nКатерина",
      speakerTema: "Автентичність і прояв...",
      speakerInstagram: "https://www.instagram.com/kozlova.katja",
      speakerClass: "speakerNameClass4",
      numberOfSpeaker: "(04)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails: "Наставник особистих брендів...",
    },
    {
      id: 5,
      image: Besborodih,
      speakerName: "Безбородих\nОлена",
      speakerTema: "Уточнюється",
      speakerInstagram: "https://www.instagram.com/lenabezb",
      speakerClass: "speakerNameClass5",
      numberOfSpeaker: "(05)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails: "Магістр бізнес адміністрування...",
    },
    {
      id: 6,
      image: Stripko,
      speakerName: "Стрипко\nТаня",
      speakerTema: "Уточнюється",
      speakerInstagram: "https://www.instagram.com/todorivaaa",
      speakerClass: "speakerNameClass6",
      numberOfSpeaker: "(06)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails: "Підприємиця з досвідом...",
    },
    {
      id: 7,
      image: Shihrova,
      speakerName: "Щигрова\nЄвгенія",
      speakerTema: "Anti -Age, як код...",
      speakerInstagram: "https://www.instagram.com/j.a.n.e_she/",
      speakerClass: "speakerNameClass7",
      numberOfSpeaker: "(07)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails: "Фізична реабілітація, Stretching...",
    },
    {
      id: 8,
      image: Tokar,
      speakerName: "Токар\nЯна",
      speakerTema: "Зовнішність можна покращити...",
      speakerInstagram: "https://www.instagram.com/dr.yana_tokar_",
      speakerClass: "speakerNameClass8",
      numberOfSpeaker: "(08)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails: "Дерматологиня, хірургиня, автор...",
    },
    {
      id: 9,
      image: Shotropa,
      speakerName: "Шотропа\nМішель",
      speakerTema: "Уточнюється",
      speakerInstagram: "https://www.instagram.com/mishel_shotropa",
      speakerClass: "speakerNameClass9",
      numberOfSpeaker: "(09)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails: "PR-компанія, Instahacks, 11 років...",
    },
    {
      id: 12,
      image: Ask,
      speakerName: "це ще не все!\nочікуй інформацію!",
      speakerTema: "Уточнюється",
      speakerInstagram: "",
      speakerClass: "speakerNameClassLast",
      numberOfSpeaker: "(10)",
      moreInfoBtnClass: "moreInfoBtnDisplayNone",
      contentDetails: "",
    },
  ];

  return (
    <section
      className={styles.SpeakersSection}
      id="speakersSectionAnchor"
      ref={containerRef}
    >
      <p className={styles.textBtwSection}>(наші спікери)</p>
      <div ref={wrapperRef} className={styles.swiperCustomWrapper}>
        <div className={styles.swiperInner}>
          {speakers.map((speaker, index) => (
            <div
              className={`${styles.swiperSlide} ${
                styles[speaker.swiperSlideBackground]
              }`}
              ref={(el) => (slidesRef.current[index] = el)}
              key={speaker.id}
            >
              <article
                className={`${styles[speaker.swiperSlideBackground]} ${
                  styles.slideWrapper
                }`}
                  >
                      <img
                                      src={speaker.image}
                                      alt={speaker.speakerName}
                                      className={styles.speakerImage}
                                    />
                <ul>
                  <li>
                    <p className={styles.numberOfSpeaker}>
                      {speaker.numberOfSpeaker}
                    </p>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles[speaker.speakerClass]}
                      href={speaker.speakerInstagram}
                    >
                      <svg className={styles.instagram} width={32} height={32}>
                        <use xlinkHref={`${sprite}#icon-inst`} />
                      </svg>
                    </a>
                  </li>
                </ul>
                <div
                  className={`${styles.dropUpDetails} ${
                    activeSpeakerId === speaker.id ? styles.active : ""
                  }`}
                >
                  <p className={styles.contentDetails}>
                    {speaker.contentDetails}
                  </p>
                </div>
                <div className={styles.wrapperSpeakerInfo}>
                  <h3
                    className={`${styles.speakerName} ${
                      styles[speaker.speakerClass]
                    }`}
                  >
                    {speaker.speakerName}
                  </h3>
                  <button
                    className={styles[speaker.moreInfoBtnClass]}
                    onClick={() => toggleDetails(speaker.id)}
                  >
                    {activeSpeakerId === speaker.id ? "-" : "+"}
                  </button>
                </div>
              </article>
              <p className={styles.titleTema}>тема:</p>
              <p className={styles.textTema}>{speaker.speakerTema}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
