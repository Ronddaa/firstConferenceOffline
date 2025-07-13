import Header from "../../components/Header/Header";
import HeaderComp from "../../components/Header/Computer/HeaderComp";

import Footer from "../../components/Footer/Footer";
import FooterComp from "../../components/Footer/FooterComp/FooterComp";


import useIsDesktop from "../../hooks/useIsDesktop";
import HeroHorobec from "./Hero/HeroHorobec";
import BranchSection from "./BranchSection/BranchSection";
import AnastasiyaSection from "./AnastasiyaSection/AnastasiaSection";
import HeroHorobecComp from "./Hero/HeroComp/HeroHorobecComp";

export default function HorobecPage() {
    const isDesctop = useIsDesktop()
    return (
        <>
            {isDesctop ? <HeaderComp /> : <Header />}
            {isDesctop ? <HeroHorobecComp /> : <HeroHorobec />}
            <BranchSection />
            <AnastasiyaSection />
            {isDesctop ? <FooterComp /> : <Footer />}
        </>
    )
}