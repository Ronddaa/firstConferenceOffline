import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./YourDaySection.module.css";
import sprite from "../icons.svg";

export default function YourDaySection() {
  const items = [
    {
      id: 1,
      icon: "blackHole",
      title: "ШУКАЄШ СПРАВЖНІЙ ЗВ’ЯЗОК ІЗ СОБОЮ?",
      content:
        "Разом із експертками та дослідницями ми не просто говоримо - ми працюємо з тим, що справді має значення: тілесні практики, чесні розмови, глибоке усвідомлення.",
    },
    {
      id: 2,
      icon: "star",
      title: "ГОТОВА ГОВОРИТИ ПРО ІНТИМНЕ І ФІНАНСОВЕ — БЕЗ ТАБУ",
      content:
        "Разом із сексологинями й психологинями ми відкрито говоримо про те, що зазвичай мовчать. Як не втратити себе, коли формуєш власну фінансову стабільність в Україні і на чужбині? Як відчути свободу у стосунках? Тут ти отримаєш реальні відповіді, без прикрас.",
    },
    {
      id: 3,
      icon: "diamond",
      title: "ТВОРЧА І ШУКАЄШ САМОІДЕНТИФІКАЦІЇ",
      content:
        "Ти хочеш творити, але шукаєш простір, де твоя українська унікальність посилиться? На «КОД ЖІНКИ» ти: відкриєш нові способи вираження ідентичності разом із спікерками, які живуть своєю творчістю.",
    },
    {
      id: 4,
      icon: "hands",
      title: "ЦІНУЄШ УКРАЇНСЬКУ ЖІНОЧУ СПІЛЬНОТУ",
      content:
        "Ця подія для тебе, якщо ти – в новому для себе середовищі, яка хоче бути серед рівних. Ти прагнеш кола, де діляться не лише досвідом, а й натхненням? На «КОД ЖІНКИ» ти: знайдеш ком’юніті, де сила і вразливість - це одне ціле, а кожна розмова заряджає на нові вершини.",
    },
  ];

  return (
    <section className={styles.YourDaySection}>
      <p className="btwSectionText">(Цей день для тебе, <br /> якщо ти:)</p>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        className={styles.swiper}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className={styles.slide}>
            <svg className={styles.icons} width={40} height={40}>
              <use xlinkHref={`${sprite}#icon-${item.icon}`}></use>
            </svg>
            <h2 className={styles.titleSlideYouDay}>{item.title}</h2>
            {item.content && <p className={styles.content}>{item.content}</p>}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
