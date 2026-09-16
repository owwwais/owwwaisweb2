import { MotionConfig } from "motion/react";

import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Faq from "./components/Faq";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Stats from "./components/Stats";
import Work from "./components/Work";

export default function App() {
  return (
    // Framer animations are JS-driven, so the CSS reduced-motion block does not
    // reach them; this makes them honour the OS setting too.
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Work />
        <Products />
        <Experience />
        <Faq />
        <Contact />
      </main>
    </MotionConfig>
  );
}
