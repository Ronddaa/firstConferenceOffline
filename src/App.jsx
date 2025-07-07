import { useEffect, useState, lazy } from "react";
import { Routes, Route } from "react-router-dom"; // 📌 добавлено
import useIsDesktop from "./hooks/useIsDesktop";

// 🔁 Мобильная и десктопная шапка
import Header from "./components/Header/Header";
import HeaderComp from "./components/Header/Computer/HeaderComp";

// 📦 Остальные секции — пока только мобильные версии
import Hero from "./components/Hero/Hero";
import HeroComp from "./components/Hero/HeroComp/HeroComp";
import Program from "./components/Program/Program";

// 🎯 Новая страница
import PageThx from "./PageThx/PageThx"; // 🆕 страница благодарности
import GoldTicketPage from "./TicketsPages/GoldTicketsPage/GoldTicketPage";
import LuxeTicketPage from "./TicketsPages/LuxeTicketPage/LuxeTicketPage";
import PremiumTicketPage from "./TicketsPages/PremiumPage/PremiunTicketPage";

// 🎯 Остальные секции
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
    const timeout = setTimeout(() => {
      setShowRest(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Routes>
      {/* Главная страница */}
      <Route
        path="/"
        element={
          <>
            {isDesktop ? <HeaderComp /> : <Header />}
            {isDesktop ? <HeroComp /> : <Hero />}
            <Program />
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
        }
      />

      {/* Страница благодарности */}
      <Route path="/thank-you" element={<PageThx />} />
      <Route path="/ticket/gold/:ticketId" element={<GoldTicketPage />} />
      <Route path="/ticket/luxe/" element={<LuxeTicketPage />} />
      <Route path="/ticket/premium/" element={<PremiumTicketPage />} />
    </Routes>
  );
}
