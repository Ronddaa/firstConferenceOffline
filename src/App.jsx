import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Program from "./components/Program/Program";
import ProgramOnConference from "./components/ProgramOnConference/ProgramOnConference";
import Tema from "./components/Tema/Tema";
import Tickets from "./components/TicketsSEction/TicketsSection";

export default function App() {
  

  return (
    <>
      <Header />
      <Hero />
      <Program />
      <Tema />
      <ProgramOnConference />
      <Tickets />
    </>
  )
}

