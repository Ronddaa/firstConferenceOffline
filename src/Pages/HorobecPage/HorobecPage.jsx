import Header from "../../components/Header/Header";
import HeaderComp from "../../components/Header/Computer/HeaderComp";

import Footer from "../../components/Footer/Footer";
import FooterComp from "../../components/Footer/FooterComp/FooterComp";


import useIsDesktop from "../../hooks/useIsDesktop";
import HeroHorobec from "./Hero/HeroHorobec";
import BranchSection from "./BranchSection/BranchSection";
import AnastasiyaSection from "./AnastasiyaSection/AnastasiaSection";

export default function HorobecPage() {
    const isDesctop = useIsDesktop()
    return (
        <>
            {isDesctop ? <HeaderComp /> : <Header />}
            <HeroHorobec />
            <BranchSection />
            <AnastasiyaSection />
            {isDesctop ? <FooterComp /> : <Footer />}
        </>
    )
}