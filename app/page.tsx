import Hero from '@/components/sections/Hero';
import LogosBar from '@/components/sections/LogosBar';
import ProfessionalWork from '@/components/sections/ProfessionalWork';
import Projects from '@/components/sections/Projects';
import InternshipWork from '@/components/sections/InternshipWork';
import Achievements from '@/components/sections/Achievements';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

export default function Page() {
  return (
    <>
      <Hero />
      <LogosBar />
      <About />
      <ProfessionalWork />
      <Projects />
      <InternshipWork />
      <Achievements />
      <Contact />
    </>
  );
}
