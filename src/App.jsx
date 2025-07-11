import { Routes, Route } from "react-router-dom";
import useIsDesktop from "./hooks/useIsDesktop";

// 🔁 Хэдеры
import Header from "./components/Header/Header";
import HeaderComp from "./components/Header/Computer/HeaderComp";

// 📦 Главный блок
import Hero from "./components/Hero/Hero";
import HeroComp from "./components/Hero/HeroComp/HeroComp";

// 📌 Секции
import Program from "./components/Program/Program";
import Tema from "./components/Tema/Tema";
import SpeakersSection from "./components/SpeakersSection/SpeakersSection";
import ProgramOnConference from "./components/ProgramOnConference/ProgramOnConference";
import Tickets from "./components/TicketsSection/TicketsSection";
import PartnersSection from "./components/Partners/PartnersSection";
import Auction from "./components/Auction/Auction";
import Donation from "./components/Donation/Donation";
import DonationComp from "./components/Donation/DonationComp/DonationComp";
import FAQ from "./components/FAQ/FAQ";
import TelegramBlock from "./components/TelegramBlock/TelegramBlock";
import Footer from "./components/Footer/Footer";
import FooterComp from "./components/Footer/FooterComp/FooterComp";

// 📄 Страницы
import PageThx from "./PageThx/PageThx";
import GoldTicketPage from "./TicketsPages/GoldTicketsPage/GoldTicketPage";
import LuxeTicketPage from "./TicketsPages/LuxeTicketPage/LuxeTicketPage";
import PremiumTicketPage from "./TicketsPages/PremiumPage/PremiunTicketPage";
import LastMinutePage from "./TicketsPages/LastMinutePage/LastMinutePage";
import CheckPaymentPage from "./CheckPaymentPage/CheckPaymentPage";

export default function App() {
  const isDesktop = useIsDesktop();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {isDesktop ? <HeaderComp /> : <Header />}
            {isDesktop ? <HeroComp /> : <Hero />}

            {/* Все секции сразу */}
            <Program />
            <Tema />
            <SpeakersSection />
            <ProgramOnConference />
            <Tickets />
            <PartnersSection />
            <Auction />
            {isDesktop ? <DonationComp /> : <Donation />}
            <FAQ />
            <TelegramBlock />
            {isDesktop ? <FooterComp /> : <Footer />}
          </>
        }
      />

      {/* Страницы билетов и оплаты */}
      <Route path="/thank-you/:invoiceId" element={<PageThx />} />
      <Route path="/ticket/gold/:invoiceId" element={<GoldTicketPage />} />
      <Route path="/ticket/luxe/:invoiceId" element={<LuxeTicketPage />} />
      <Route
        path="/ticket/last-minute/:invoiceId"
        element={<LastMinutePage />}
      />
      <Route
        path="/ticket/premium/:invoiceId"
        element={<PremiumTicketPage />}
      />
      <Route
        path="/check-payment/check/123456"
        element={<CheckPaymentPage />}
      />
    </Routes>
  );
}
