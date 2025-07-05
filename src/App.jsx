import { useEffect, useState, lazy } from "react";
import useIsDesktop from "./hooks/useIsDesktop";

// 🔁 Мобильная и десктопная шапка
import Header from "./components/Header/Header";
import HeaderComp from "./components/Header/Computer/HeaderComp";

// 📦 Остальные секции — пока только мобильные версии
import Hero from "./components/Hero/Hero";
import Program from "./components/Program/Program";

const Tema = lazy(() => import("./components/Tema/Tema"));
const SpeakersSection = lazy(() =>
  import("./components/SpeakersSection/SpeakersSection")
);
const ProgramOnConference = lazy(() =>
  import("./components/ProgramOnConference/ProgramOnConference")
);
const Tickets = lazy(() =>
  import("./components/TicketsSection/TicketsSection")
);
const PartnersSection = lazy(() =>
  import("./components/Partners/PartnersSection")
);
const Auction = lazy(() => import("./components/Auction/Auction"));
const Donation = lazy(() => import("./components/Donation/Donation"));
const FAQ = lazy(() => import("./components/FAQ/FAQ"));
const TelegramBlock = lazy(() =>
  import("./components/TelegramBlock/TelegramBlock")
);
const Footer = lazy(() => import("./components/Footer/Footer"));

export default function App() {
  const isDesktop = useIsDesktop(); // 📱 определение ширины экрана
  const [showRest, setShowRest] = useState(false);

  useEffect(() => {
    // ⏱️ Отложенная загрузка остальных блоков для ускорения LCP
    const timeout = setTimeout(() => {
      setShowRest(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* 🧭 Показываем desktop или mobile header */}
      {isDesktop ? <HeaderComp /> : <Header />}

      {/* 🟡 Первые три секции загружаются сразу */}
      <Hero />
      <Program />

      {/* ⏳ Остальные секции — через lazy */}
      {showRest && (
        <>
          <Tema />
          <SpeakersSection />
          <ProgramOnConference />
          <Tickets />
          <PartnersSection />
          <Auction />
          <Donation />
          <FAQ />
          <TelegramBlock />
          <Footer />
        </>
      )}
    </>
  );
}
