import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Disease from "./sections/Disease";
import WhyResearch from "./sections/WhyResearch";
import StudyDesign from "./sections/StudyDesign";
import CampaignProgress from "./sections/CampaignProgress";
import Team from "./sections/Team";
import Gallery from "./sections/Gallery";
import Participate from "./sections/Participate";
import Footer from "./sections/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.15,
      smooth: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after everything loads
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(refreshTimeout);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Disease />
        <WhyResearch />
        <StudyDesign />
        <CampaignProgress />
        <Team />
        <Gallery />
        <Participate />
      </main>
      <Footer />
    </div>
  );
}

export default App;
