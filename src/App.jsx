import { useEffect, useState, lazy } from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Program from "./components/Program/Program";

// 💡 Остальные компоненты — лениво
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
  const [showRest, setShowRest] = useState(false);

  // ⚙️ Показываем оставшиеся секции после полной загрузки первых
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowRest(true);
    }, 300); // можно увеличить задержку, если нужно "после рендера"
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Header />
      <Hero />
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
  );
}
