import { useState, useEffect, useMemo } from "react";
import styles from "./SpeakersSection.module.css";
import sprite from "../icons.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules"; // ⬅️ FreeMode удалён

import Tolstikova from "./Tolstikova.webp";
import Kozachkova from "./Kozachkova.webp";
import Matushevska from "./Matushevska.webp";
import Kozlova from "./Kozlova.webp";
import Besborodih from "./Besborodih.webp";
import Stripko from "./Stripko.webp";
import Shihrova from "./Shihrova.webp";
import Tokar from "./Tokar.webp";
import Shotropa from "./Shotropa.webp";
import Prudnikova from './Prudnikova.webp';
import Hovorova from './Hovorova.webp';
import Prokopenko from "./Prokopenko.webp";
import Zaliznyak from './Zaliznyak.webp';
import Volk from "./Volk.webp";
import Ask from "./ask.png";

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
  const swiperAutoHeight = useMemo(() => !isDesktop, [isDesktop]);

  const toggleDetails = (id) => {
    setActiveSpeakerId((prev) => (prev === id ? null : id));
  };

  const speakers = [
    {
      id: 1,
      speakerName: "толстікова\nкатерина",
      speakerTema:
        "Їсти чи ні? Про що говорить наука: популярні міфи в дієтології",
      image: Tolstikova,
      speakerInstagram: "https://www.instagram.com/dr.tolstikova",
      speakerClass: "speakerNameClass1",
      numberOfSpeaker: "(01)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails: "Скоро дізнаєтесь про мене трохи більше. =)",
    },
    {
      id: 2,
      speakerName: "козачкова\nюлія",
      speakerTema: "Ген грошей",
      image: Kozachkova,
      speakerInstagram: "https://www.instagram.com/kozachkova_yuliia",
      speakerClass: "speakerNameClass2",
      numberOfSpeaker: "(02)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Психолог та коуч з одинадцятирічним досвідом практики, автор книги «Мистецтво БуТИ в ЦЕЙ:ЧАС», підприємиця, що створює WOW-продукти: мобільний додаток Teya, онлайн-магазин товарів Teya Shop, авторські тренінги, співзасновниця маркетингового агенства «Спокусливий бренд»",
    },
    {
      id: 3,
      speakerName: "Матюшевська\nАнастасія-Олімпія",
      speakerTema: "Квантовий код жінки: як бажання створює реальність",
      image: Matushevska,
      speakerInstagram:
        "https://www.instagram.com/anastasia.olimpia.matushevska",
      speakerClass: "speakerNameClass3",
      numberOfSpeaker: "(03)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Психотерапевт, сексолог. Жінка, мама, партнерка, творчиня. Автор програм для майбутніх сексологів та психотерапевтів. Засновниця проєкту  «ЖІНКИ» - серії трансформаційних подій, ретритів і конференцій про глибину, сміливість і жіночу цілісність.",
    },
    {
      id: 4,
      speakerName: "Козлова\nКатерина",
      speakerTema:
        "Автентичність і прояв: як жінці бути собою та масштабуватись через особистий бренд",
      image: Kozlova,
      speakerInstagram: "https://www.instagram.com/kozlova.katja",
      speakerClass: "speakerNameClass4",
      numberOfSpeaker: "(04)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Наставник особистих брендів, автор курсу по проявленості MANIFESTATION COURSE, трансформаційний маркетолог, модель, блогер",
    },
    {
      id: 5,
      speakerName: "Безбородих\nОлена",
      speakerTema:
        '"Хороша дівчинка" не заробляє мільйони або Як жіночі сценарії формують фінансову стелю',
      image: Besborodih,
      speakerInstagram: "https://www.instagram.com/lenabezb",
      speakerClass: "speakerNameClass5",
      numberOfSpeaker: "(05)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Магістр бізнес адміністрування, викладач економіки, до війни керувала власним мережовим бізнесом понад 10 років, бакалавр психології, практикуючий психолог, гештальт-терапевт, тілесно-орієнтований терапевт.",
    },
    {
      id: 6,
      speakerName: "Стрипко\nТаня",
      speakerTema: "Панельна дискусія: Продюсер - новий архітектор впливу",
      image: Stripko,
      speakerInstagram: "https://www.instagram.com/todorivaaa",
      speakerClass: "speakerNameClass6",
      numberOfSpeaker: "(06)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Підприємиця з досвідом на трьох континентах: відкривала салони краси в таких країнах, як - Україна, Італія, Канада. Продюсер, власниця продюсерської агенції - заробила за 2 роки собі і експертам запуски на 1000000+$. Навчаю запускати навчальні проєкти, створювати  бренди з нуля. Запускаю експертів, які не просто красиво говорять, а дорого продають, власниця продюсерської агенції.",
    },
    {
      id: 7,
      speakerName: "Щигрова\nЄвгенія",
      speakerTema: "Anti -Age, як код гнучкої жінки.\nAnti -Age та Stretching",
      image: Shihrova,
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
      speakerTema:
        "Зовнішність можна покращити. Але чи вистачить сміливості стати собою?",
      image: Tokar,
      speakerInstagram: "https://www.instagram.com/dr.yana_tokar_",
      speakerClass: "speakerNameClass8",
      numberOfSpeaker: "(08)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        'Дерматологиня, хірургиня, доктор медицини, незалежний експерт світових брендів, спікер міжнародних конгресів, автор книги "Сонячна контрацепція" та YouTube каналу "не косметолог, а ЛІКАР", засновниця University of aesthetic medicine, спікер Польського інституту естетичної медицини.',
    },
    {
      id: 9,
      speakerName: "Шотропа\nМішель",
      speakerTema: "Панельна дискусія: Продюсер - новий архітектор впливу",
      image: Shotropa,
      speakerInstagram: "https://www.instagram.com/mishel_shotropa",
      speakerClass: "speakerNameClass9",
      numberOfSpeaker: "(09)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        'Власниця маркетингової та PR-компанії "SHOTROPA MEDIA". 11 років у бізнесі. CEO "INSTAHACKS" - перше міжнародне комʼюніті для експертів. Співпрацюю з CHELSEA. Більше 4000+ учнів моїх навчальних програм по цілому світу',
    },
    {
      id: 10,
      speakerName: "вікторія холмс\n(пруднікова)",
      speakerTema: "Родові сценарії жінки, яка боїться мати більше",
      image: Prudnikova,
      speakerInstagram: "https://www.instagram.com/prudnikovavictoria/",
      speakerClass: "speakerNameClass10",
      numberOfSpeaker: "(10)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Експерт з ментальної генетики. Спеціалізується на виявленні підсвідомих неконструктивних моделей думок. Консультант, 12 000 інд. Консультацій за 13 років. Cоціолог. Блогер. Автор методики «PPF Past Present Future» та «АУДИТИ ЖИТТЯ».Автор проекту Наставництва «Жінка. Гроші. Призначення». Автор книги «Історія (не)звичайної жінки, або Випусти на волю свого генія»",
    },
    {
      id: 11,
      speakerName: "Говорова\nАліна",
      speakerTema: "Код жіночого оргазму: тіло, свідомість, дозволи",
      image: Hovorova,
      speakerInstagram:
        "https://www.instagram.com/govorova.a_sexology?igsh=MWJpaHgwY3FkZDQ1aQ==",
      speakerClass: "speakerNameClass11",
      numberOfSpeaker: "(11)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Сертифікований сексолог, авторка проектів для жінок, мама трьох синів і жінка, яка обрала себе - не замість сім’ї, а поруч з нею. Бізнесвумен",
    },
    {
      id: 12,
      speakerName: "Прокопенко\nАнна",
      speakerTema: "Уточнюється",
      image: Prokopenko,
      speakerInstagram:
        "https://www.instagram.com/annaa.prokopenko?igsh=M3hmczVod3ZmemM4",
      speakerClass: "speakerNameClass12",
      numberOfSpeaker: "(12)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Майстер тілесних та енергопрактик, тантри, провідник до сексуальності та контакту з тілом Mentor of body and energy practices & Facilitator Kundalini Activation За 2 роки допомогла більше ніж 400 жінкам змінити життя, розкривши свою сексуальну енергію. Організатор авторських кемпів-ретритів/тренінгів по світу, де жінки через пробуження сексуальної енергії згадують себе і трансформують всі сфери життя",
    },
    {
      id: 13,
      speakerName: "Залізняк\nВіталія",
      speakerTema: "Шлях жінки до її фінансової незалежності",
      image: Zaliznyak,
      speakerInstagram:
        "https://www.instagram.com/vita_liia_/profilecard/?igsh=NmNmaGdhOXlsNjZp",
      speakerClass: "speakerNameClass13",
      numberOfSpeaker: "(13)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Експертка з інвестицій з досвідом понад 3 роки. Інвестую у фондовий ринок, криптовалюту, нерухомість. Маю ступінь доктора (PhD) від німецького університету. Засновниця курсу з інвестицій у фондовий ринок від доктора наук InvestBee. Збільшила свій дохід в 9 разів за останні 4 роки. Зростила свій капітал в 3 рази за останній рік. Створила авторську систему примноження капіталу. Випускниця академії лідерства. Моя місія - зробити українців багатшими. І не тільки в грошовому сенсі.",
    },
    {
      id: 14,
      speakerName: "Волк\nОлена",
      speakerTema: "Як ми зробили X2 в обігу за рік: кейс агенції EvoTalents",
      image: Volk,
      speakerInstagram:
        "https://www.instagram.com/volk_elena/profilecard/?igsh=bHRvNDltZm12aWpu",
      speakerClass: "speakerNameClass14",
      numberOfSpeaker: "(14)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "9+ років в бізнесі, засновниця ІТ рекрутингової агенції EvoTalents. Має сумарно 45 000+ підписників у соцмережах. Допомагає експертам ставати підприємцями на своїй авторській програмі EVBusiness. За період роботи з нею роблять запуски на 5000-10000$. Ментор підприємців в бізнес клубі Growth Factory. Авторка статей в ELLE, BAZAAR, Mc.today та іноземному Brainz. Інвестор, створила капітал в акціях провідних компанії, криптовалюті. Придбала дві нерухомості на Балі. Дружина та мама доньки 6ти років. Живе в Лондоні.",
    },
    {
      id: 15,
      speakerName: "це ще не все!\nочікуй інформацію!",
      speakerTema: "Уточнюється",
      image: Ask,
      speakerInstagram: "",
      speakerClass: "speakerNameClassLast",
      numberOfSpeaker: "(15)",
      moreInfoBtnClass: "moreInfoBtnDisplayNone",
      contentDetails: "",
    },
  ];

  return (
    <section className={styles.SpeakersSection} id="speakersSectionAnchor">
      <p className={styles.textBtwSection}>(наші спікери)</p>
      <Swiper
        scrollbar={{ hide: false, draggable: true }}
        modules={[Scrollbar]} // ⬅️ только Scrollbar
        touchRatio={1}
        spaceBetween={20}
        slidesPerView={slidesPerView}
        className="mySwiper"
        autoHeight={swiperAutoHeight}
        watchOverflow
      >
        {speakers.map((speaker) => (
          <SwiperSlide key={speaker.id} className={styles.swiperSlide}>
            <article className={styles.slideWrapper}>
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
                  {speaker.speakerInstagram && (
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
                  )}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
