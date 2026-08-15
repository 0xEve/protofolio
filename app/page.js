import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Manifesto from "@/components/Manifesto";
import Contact from "@/components/Contact";
import { profile } from "@/data/profile";

export default function Page() {
  return (
    <main>
      <Hero />
      <Marquee items={profile.marquee} />
      <About />
      <Work />
      <Skills />
      <Education />
      <Manifesto />
      <Contact />
    </main>
  );
}
