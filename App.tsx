import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { Home } from './pages/Home';
import { Memberships } from './pages/Memberships';
import { PersonalTraining } from './pages/PersonalTraining';
import { Classes } from './pages/Classes';
import { Transformations } from './pages/Transformations';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Tools } from './pages/Tools';
import { Gallery } from './pages/Gallery';
import DemoLoader from './components/DemoLoader';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Background Liquid Animation Component
const LiquidBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
    {/* Large Blobs for Atmosphere */}
    <div className="absolute top-[-30%] left-[-20%] w-[100vw] h-[100vw] bg-neon-blue/10 rounded-full blur-[150px] mix-blend-screen animate-blob opacity-40"></div>
    <div className="absolute top-[20%] right-[-20%] w-[80vw] h-[80vw] bg-neon-orange/10 rounded-full blur-[180px] mix-blend-screen animate-blob animation-delay-2000 opacity-30"></div>
    <div className="absolute bottom-[-30%] left-[10%] w-[90vw] h-[90vw] bg-purple-600/10 rounded-full blur-[200px] mix-blend-screen animate-blob animation-delay-4000 opacity-20"></div>

    {/* Noise Texture for that premium grain */}
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-[0.04]"></div>

    {/* Glass Overlay */}
    <div className="absolute inset-0 backdrop-blur-[1px]"></div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/memberships" element={<PageTransition><Memberships /></PageTransition>} />
        <Route path="/personal-training" element={<PageTransition><PersonalTraining /></PageTransition>} />
        <Route path="/classes" element={<PageTransition><Classes /></PageTransition>} />
        <Route path="/transformations" element={<PageTransition><Transformations /></PageTransition>} />
        <Route path="/tools" element={<PageTransition><Tools /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(() => sessionStorage.getItem('loaderShown_lankafitness') !== '1');

  const handleLoaderComplete = () => {
    sessionStorage.setItem('loaderShown_lankafitness', '1');
    setLoading(false);
  };

  return (
    <Router>
      {loading && <DemoLoader demoName="Lanka Fitness" demoLogoUrl="/logo.svg" onComplete={handleLoaderComplete} />}
      <ScrollToTop />
      {/* Removed overflow-x-hidden from here, now handled in body style to prevent locking */}
      <div className="min-h-screen flex flex-col font-sans text-white antialiased selection:bg-neon-blue selection:text-black relative">
        <LiquidBackground />

        <Navbar />

        <main className="flex-grow pt-24 md:pt-32">
          <AnimatedRoutes />
        </main>

        <Footer />

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/94770000000"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-[#25D366]/90 backdrop-blur-md text-white p-4 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform duration-300 group border border-white/20 overflow-hidden"
          aria-label="Contact on WhatsApp"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full"></div>
          <svg className="w-8 h-8 fill-current relative z-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </Router>
  );
};

export default App;