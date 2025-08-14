import { useState, useEffect, useRef } from "react";
import styles from "./SpeakersSection.module.css";
import sprite from "../icons.svg";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Tolstikova from "./Tolstikova.webp";
import Matushevska from "./Matushevska.webp";
import Slobodyan from "./SLOBODYAN.webp";
import Kozlova from "./Kozlova.webp";
import Besborodih from "./Besborodih.webp";
import Stripko from "./Stripko.webp";
import Shotropa from "./Shotropa.webp";
import Ask from "./ask.png";
import Hovorova from "./Hovorova.webp";
import Prokopenko from "./Prokopenko.webp";
import Zaliznyak from "./Zaliznyak.webp";
import Volk from "./Volk.webp";
import Bazhana from './Bazhana.webp';

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

    gsap.set(slidesRef.current, { xPercent: 75 });
    const scrollTween = gsap.to(slidesRef.current, {
      xPercent: -100 * (totalSlides - 2),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "bottom bottom",
        end: () => "+=" + container.offsetWidth,
        pin: true,
        scrub: 3,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        horizontal: false,
      },
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // ✅ правильно
    };
  }, []);

 const speakers = [
    {
      id: 1,
      speakerName: "Матюшевська\nАнастасія-Олімпія",
      speakerTema: "Квантовий код жінки: як бажання створює реальність",
      image: Matushevska,
      speakerInstagram:
        "https://www.instagram.com/anastasia.olimpia.matushevska",
      speakerClass: "speakerNameClass1",
      numberOfSpeaker: "(01)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Психотерапевт, сексолог. Жінка, мама, партнерка, творчиня. Автор програм для майбутніх сексологів та психотерапевтів. Засновниця проєкту  «ЖІНКИ» - серії трансформаційних подій, ретритів і конференцій про глибину, сміливість і жіночу цілісність.",
    },
    {
      id: 2,
      speakerName: "УЛЯНА\nСЛОБОДЯН",
      speakerTema: "Сила жінки",
      image: Slobodyan,
      speakerInstagram:
        "https://www.instagram.com/ulyana.slobodyan?igsh=YmZoYWxneWJ0MzNv",
      speakerClass: "speakerNameClass2",
      numberOfSpeaker: "(02)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Жінка, яка пройшла медикаментозну кому, операцію на мозку і повернулась у життя з 1% шансом - і з новою місією. Професійна бʼюті-стилістка з понад 10-річним досвідом. Авторка онлайн-курсів з макіяжу, які пройшли понад 2000 жінок.Блогерка з аудиторією понад 140 тис. в Instagram і 43 тис. у TikTok. UGC-модель, яка співпрацює з міжнародними та українськими брендами",
    },
    {
      id: 3,
      speakerName: "Козлова\nКатерина",
      speakerTema:
        "Автентичність і прояв: як жінці бути собою та масштабуватись через особистий бренд",
      image: Kozlova,
      speakerInstagram: "https://www.instagram.com/kozlova.katja",
      speakerClass: "speakerNameClass2",
      numberOfSpeaker: "(03)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Наставник особистих брендів, автор курсу по проявленості MANIFESTATION COURSE, трансформаційний маркетолог, модель, блогер",
    },
    {
      id: 4,
      speakerName: "толстікова\nкатерина",
      speakerTema:
        "Їсти чи ні? Про що говорить наука: популярні міфи в дієтології",
      image: Tolstikova,
      speakerInstagram: "https://www.instagram.com/dr.tolstikova",
      speakerClass: "speakerNameClass3",
      numberOfSpeaker: "(04)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        'Лікар загальної практики, дієтолог-ендокринолог, фуд-терапевт, спеціаліст в Anti-age харчуванні та функціональній медицині. Асистент кафедри біоорганічної та біологічної хімії НМУ ім. О. О. Богомольця. Аспірант.15 років у медицині, 12 років у дієтології та food-терапії. Спеціаліст в anti-age харчуванні. Спікер міжнародних наукових конференцій. Засновниця «Академії здоровʼя доктора Толстікової». Автор книг “Твій храм - здоров‘я”, "Стрес крiзь життя - мiй mood". Особистий лікар-дієтолог професійних спортсменів абсолютного чемпіона світу з боксу Олександра Усика, чемпіона Bellator Ярослава Амосова та тенісистки Катаріни Завацької та інших. Лікар дієтолог футбольного клубу Колос (Ковалівка).',
    },
    {
      id: 5,
      speakerName: "Безбородих\nОлена",
      speakerTema:
        '"Хороша дівчинка" не заробляє мільйони або Як жіночі сценарії формують фінансову стелю',
      image: Besborodih,
      speakerInstagram: "https://www.instagram.com/lenabezb",
      speakerClass: "speakerNameClass6",
      numberOfSpeaker: "(05)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Магістр бізнес адміністрування, викладач економіки, до війни керувала власним мережовим бізнесом понад 10 років, бакалавр психології, практикуючий психолог, гештальт-терапевт, тілесно-орієнтований терапевт.",
    },
    {
      id: 6,
      speakerName: "Шотропа\nМішель",
      speakerTema: "Панельна дискусія: Продюсер - новий архітектор впливу",
      image: Shotropa,
      speakerInstagram: "https://www.instagram.com/mishel_shotropa",
      speakerClass: "speakerNameClass8",
      numberOfSpeaker: "(06)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        'Власниця маркетингової та PR-компанії "SHOTROPA MEDIA". 11 років у бізнесі. CEO "INSTAHACKS" - перше міжнародне комʼюніті для експертів. Співпрацюю з CHELSEA. Більше 4000+ учнів моїх навчальних програм по цілому світу',
    },
    {
      id: 7,
      speakerName: "Стрипко\nТаня",
      speakerTema: "Панельна дискусія: Продюсер - новий архітектор впливу",
      image: Stripko,
      speakerInstagram: "https://www.instagram.com/todorivaaa",
      speakerClass: "speakerNameClass9",
      numberOfSpeaker: "(07)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Підприємиця з досвідом на трьох континентах: відкривала салони краси в таких країнах, як - Україна, Італія, Канада. Продюсер, власниця продюсерської агенції - заробила за 2 роки собі і експертам запуски на 1000000+$. Навчаю запускати навчальні проєкти, створювати  бренди з нуля. Запускаю експертів, які не просто красиво говорять, а дорого продають, власниця продюсерської агенції.",
    },
 
    {
      id: 8,
      speakerName: "Ольга\nЖивоткова\n(Бажана)",
      speakerTema: "Панельна дискусія: Продюсер - новий архітектор впливу",
      image: Bazhana,
      speakerInstagram: "https://www.instagram.com/bazhana/",
      speakerClass: "speakerNameClass10",
      numberOfSpeaker: "(08)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        'Авторка пісень, співачка та музичний продюсер. Входить до числа найбільш затребуваних сонграйтерів в Україні. Її пісні виконують такі зірки, як Оля Полякова, Лобода, Злата Огнєвіч, ALEKSEEV, Ірина Білик, Наталія Могилевська, Міка Ньютон, Аліна Гросу та багато інших. Написала гімн Краматорську - одну зі своїх найзнаковіших робіт. Наразі продовжує творчу діяльність: продюсує артистів, виступає сольно та готує власні проєкти. Нагороджена орденом "За службу та звитягу" ІІІ ступеня.',
    },
    {
      id: 9,
      speakerName: "Говорова\nАліна",
      speakerTema: "Код жіночого оргазму: тіло, свідомість, дозволи",
      image: Hovorova,
      speakerInstagram:
        "https://www.instagram.com/govorova.a_sexology?igsh=MWJpaHgwY3FkZDQ1aQ==",
      speakerClass: "speakerNameClass11",
      numberOfSpeaker: "(09)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Сертифікований сексолог, авторка проектів для жінок, мама трьох синів і жінка, яка обрала себе - не замість сім’ї, а поруч з нею. Бізнесвумен",
    },
    {
      id: 10,
      speakerName: "Прокопенко\nАнна",
      speakerTema: "Тіло і сексуальна енергія, як чіт-код до життя",
      image: Prokopenko,
      speakerInstagram:
        "https://www.instagram.com/annaa.prokopenko?igsh=M3hmczVod3ZmemM4",
      speakerClass: "speakerNameClass12",
      numberOfSpeaker: "(10)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Майстер тілесних та енергопрактик, тантри, провідник до сексуальності та контакту з тілом Mentor of body and energy practices & Facilitator Kundalini Activation За 2 роки допомогла більше ніж 400 жінкам змінити життя, розкривши свою сексуальну енергію. Організатор авторських кемпів-ретритів/тренінгів по світу, де жінки через пробуження сексуальної енергії згадують себе і трансформують всі сфери життя",
    },
    {
      id: 11,
      speakerName: "Залізняк\nВіталія",
      speakerTema:
        "Фінансова незалежність жінки. Як за допомогою інвестицій вирости в грошах у 2025 році.",
      image: Zaliznyak,
      speakerInstagram:
        "https://www.instagram.com/vita_liia_/profilecard/?igsh=NmNmaGdhOXlsNjZp",
      speakerClass: "speakerNameClass13",
      numberOfSpeaker: "(11)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "Експертка з інвестицій з досвідом понад 3 роки. Інвестую у фондовий ринок, криптовалюту, нерухомість. Маю ступінь доктора (PhD) від німецького університету. Засновниця курсу з інвестицій у фондовий ринок від доктора наук InvestBee. Збільшила свій дохід в 9 разів за останні 4 роки. Зростила свій капітал в 3 рази за останній рік. Створила авторську систему примноження капіталу. Випускниця академії лідерства. Моя місія - зробити українців багатшими. І не тільки в грошовому сенсі.",
    },
    {
      id: 12,
      speakerName: "Волк\nОлена",
      speakerTema: "Код на X2: як ми розшифрували ріст бізнесу за рік",
      image: Volk,
      speakerInstagram:
        "https://www.instagram.com/volk_elena/profilecard/?igsh=bHRvNDltZm12aWpu",
      speakerClass: "speakerNameClass14",
      numberOfSpeaker: "(12)",
      moreInfoBtnClass: "moreInfoBtn",
      contentDetails:
        "9+ років в бізнесі, засновниця ІТ рекрутингової агенції EvoTalents. Має сумарно 45 000+ підписників у соцмережах. Допомагає експертам ставати підприємцями на своїй авторській програмі EVBusiness. За період роботи з нею роблять запуски на 5000-10000$. Ментор підприємців в бізнес клубі Growth Factory. Авторка статей в ELLE, BAZAAR, Mc.today та іноземному Brainz. Інвестор, створила капітал в акціях провідних компанії, криптовалюті. Придбала дві нерухомості на Балі. Дружина та мама доньки 6ти років. Живе в Лондоні.",
    },
    {
      id: 13,
      speakerName: "це ще не все!\nочікуй інформацію!",
      speakerTema: "Уточнюється",
      image: Ask,
      speakerInstagram: "",
      speakerClass: "speakerNameClassLast",
      numberOfSpeaker: "(13)",
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
      <p className="btwSectionText">(наші спікери)</p>
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
