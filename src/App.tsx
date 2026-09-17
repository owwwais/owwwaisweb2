import { MotionConfig } from "motion/react";

import About from "./components/About";
import Blog from "./components/Blog";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import { useRevealScanner } from "./components/Reveal";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Trusted from "./components/Trusted";
import Work from "./components/Work";

export default function App() {
  useRevealScanner();

  return (
    // Framer animations are JS-driven, so the CSS reduced-motion block does not
    // reach them; this makes them honour the OS setting too.
    <MotionConfig reducedMotion="user">
      {/* Page texture and the two vertical hairlines that frame it. */}
      <div className="canvas" aria-hidden />
      <div className="rails" aria-hidden />

      <Header />
      <main className="relative z-10">
        <Hero />
        <Work />
        <About />
        <Skills />
        <Services />
        <Products />
        <Trusted />
        <Blog />
        <Faq />
        <Footer />
      </main>
    </MotionConfig>
  );
}
