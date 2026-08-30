import SpaceBackground from "./components/layout/SpaceBackground";
import Hero from "./components/hero/Hero";
import MusicSection from "./components/music/MusicSection";
import BioSection from "./components/bio/BioSection";
import GallerySection from "./components/gallery/GallerySection";
import Contact from "./components/contact/Contact";

function App() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-transparent text-white">
      <SpaceBackground />
      <Hero />
      <MusicSection />
      <BioSection />
      <GallerySection />
      <Contact />
    </main>
  );
}

export default App;
