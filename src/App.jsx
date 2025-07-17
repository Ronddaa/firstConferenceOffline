import { Routes, Route } from "react-router-dom";
import useIsDesktop from "./hooks/useIsDesktop";

// 🔁 Хэдеры
import Header from "./components/Header/Header";
import HeaderComp from "./components/Header/Computer/HeaderComp";

// 📦 Главный блок
import Hero from "./components/Hero/Hero";
import HeroComp from "./components/Hero/HeroComp/HeroComp";

// 📌 Секции
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
import SpeakersSectionComp from "./components/SpeakersSection/SpeakresSectionComp";
import MarysyaHorobec from "./components/MarysyaHorobecSection/MarysyaHorobec";
import HorobecSectionComp from "./components/MarysyaHorobecSection/MarysyaHorobecSectionComp/MarysyaHorobecComp";
import OurValuesMobile from "./components/OurValuesSection/Mobile/OurValuesMobile";
import OurValuesDesctop from "./components/OurValuesSection/Desctop/OurValuesDesctop";


// 📄 Страницы
import PageThx from "./Pages/PageThx/PageThx";
import GoldTicketPage from "./Pages/TicketsPages/GoldTicketsPage/GoldTicketPage";
import LuxeTicketPage from "./Pages/TicketsPages/LuxeTicketPage/LuxeTicketPage";
import PremiumTicketPage from "./Pages/TicketsPages/PremiumPage/PremiunTicketPage";
import LastMinutePage from "./Pages/TicketsPages/LastMinutePage/LastMinutePage";
import CheckPaymentPage from "./Pages/CheckPaymentPage/CheckPaymentPage";
import HorobecPage from "./Pages/HorobecPage/HorobecPage";
import HotelSection from "./components/HotelSection/HotelSecion";
import AboutConference from "./components/AboutConference/AboutConference";
import WaitYouSection from "./components/WaitYouSection/WaitYouSection";
import CreateLinkPage from "./Pages/CreateLinkPage/CreateLinkPage";
import YourDaySection from "./components/YourDaySection/YourDaySection";
import YourDaySectionDesc from "./components/YourDaySection/YourDaySectionDesc";

// Попытка плавного скролла


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
            <HotelSection />
            <AboutConference />
            {isDesktop ? <OurValuesDesctop /> : <OurValuesMobile />}
            <WaitYouSection />
            {isDesktop ? <YourDaySectionDesc /> : <YourDaySection />}
            <Tema />
            {isDesktop ? <SpeakersSectionComp /> : <SpeakersSection />}
            {isDesktop ? <HorobecSectionComp /> : <MarysyaHorobec />}
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

      {/* Страничка Горобец */}

      <Route path="/horobec" element={<HorobecPage />} />

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
      <Route
        path="/check-payment/createlinkpage/arina"
        element={<CreateLinkPage />}
      />
    </Routes>
  );
}
