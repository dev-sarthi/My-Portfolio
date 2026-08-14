import { useTheme } from './hooks';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Education from './components/Education';
import WhatIWorkWith from './components/WhatIWorkWith';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Education />
        <WhatIWorkWith />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
