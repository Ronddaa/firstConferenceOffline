import Auction from "./components/Auction/Auction";
import Donation from "./components/Donation/Donation";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import PartnersSection from "./components/Partners/PartnersSection";
import Program from "./components/Program/Program";
import ProgramOnConference from "./components/ProgramOnConference/ProgramOnConference";
import SpeakersSection from "./components/SpeakersSection/SpeakersSection";
import TelegramBlock from "./components/TelegramBlock/TelegramBlock";
import Tema from "./components/Tema/Tema";
import Tickets from "./components/TicketsSection/TicketsSection";

// import useSmoothScroll from "./useSmoothScroll";

export default function App() {
  
  // useSmoothScroll(510)

  return (
    <>
      <Header />
      <Hero />
      <Program />
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
  )
}

