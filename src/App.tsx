import { MotionConfig } from "motion/react";

import About from "./components/About";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Work from "./components/Work";

export default function App() {
  return (
    // Framer animations are JS-driven, so the CSS reduced-motion block does not
    // reach them; this makes them honour the OS setting too.
    <MotionConfig reducedMotion="user">
      {/* The two vertical hairlines that frame the page. */}
      <div className="rails" aria-hidden />

      <Header />
      <main className="relative z-10">
        <Hero />
        <Work />
        <About />
        <Skills />
        <Services />
        <Products />
        <Faq />
        <Footer />
      </main>
    </MotionConfig>
  );
}
