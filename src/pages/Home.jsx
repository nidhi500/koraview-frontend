import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Mountain, Calendar, MapPin, Book, Volume2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import FloatingChatbot from "../components/FloatingChatbot";

/* =========================
   Data (unchanged basics)
   ========================= */
const monasteries = [
  {
    name: 'Pemayangtse Monastery',
    tibetan: 'པདྨ་གཡང་རྩེ་དགོན་པ',
    location: 'Pelling, West Sikkim',
    founded: '17th Century',
    iframeSrc:
      'https://www.360cities.net/embed_iframe/pemayangste-monastery-in-sikkim?utm_source=360embed&utm_medium=embed&utm_campaign=onpage',
    history:
      "པདྨ་གཡང་རྩེ་དགོན་པ། Built in the 17th century, Pemayangtse means 'Perfect Sublime Lotus'. Founded by Lhatsun Chenpo, it stands as one of Sikkim's most sacred Nyingma monasteries, perched on a hilltop overlooking the Himalayas.",
    significance: 'རྙིང་མ་པའི་གདན་ས། Seat of the Nyingma order in Sikkim',
    audioLinks: {
      hindi: '/assets/audio/pemayangtse-hindi.mp3',
      nepali: '/assets/audio/pemayangtse-nepali.mp3',
    },
    manuscripts: [
      { title: 'རིན་ཆེན་གཏེར་མཛོད། - Precious Treasury', link: '#' },
      { title: 'སྙིང་ཐིག་ཡ་བཞི། - Four-fold Heart Essence', link: '#' },
    ],
  },
  {
    name: 'Rumtek Monastery',
    tibetan: 'རུམ་ཐེག་དགོན་པ',
    location: 'Rumtek, East Sikkim',
    founded: '16th Century (Rebuilt 1960s)',
    iframeSrc: 'https://www.360cities.net/embed_iframe/6000x3000#275.40,-15.20,70.0',
    history:
      "རུམ་ཐེག་དགོན་པ། The 'Dharmachakra Centre', seat of the Karmapa Lama. Originally built in the 16th century and magnificently reconstructed in the 1960s, it houses precious Buddhist artifacts and serves as the center of Karma Kagyu lineage.",
    significance: 'ཀརྨ་པའི་གདན་ས། Seat of His Holiness the Karmapa',
    audioLinks: {
      hindi: '/assets/audio/rumtek-hindi.mp3',
      nepali: '/assets/audio/rumtek-nepali.mp3',
    },
    manuscripts: [
      { title: 'བཀའ་འགྱུར། - Kangyur Collection', link: '#' },
      { title: 'བསྟན་འགྱུར། - Tengyur Commentaries', link: '#' },
    ],
  },
  {
    name: 'Tashiding Monastery',
    tibetan: 'བཀྲ་ཤིས་སྡིང་དགོན་པ',
    location: 'Tashiding, West Sikkim',
    founded: '17th Century',
    iframeSrc:
      'https://www.360cities.net/embed_iframe/sikkim-khecheopalri-lake-india',
    history:
      "བཀྲ་ཤིས་སྡིང་དགོན་པ། 'Auspicious Hill Monastery' sits atop a sacred hill between Rangit and Rathong rivers. This holy site witnesses the sacred Bhumchu festival, where holy water predictions foretell the year ahead.",
    significance: 'གནས་མཆོག - Sacred pilgrimage site of Sikkim',
    audioLinks: {
      hindi: '/assets/audio/tashiding-hindi.mp3',
      nepali: '/assets/audio/tashiding-nepali.mp3',
    },
    manuscripts: [
      { title: 'གནས་ལུང་། - Sacred Site Prophecies', link: '#' },
      { title: 'བཀྲ་ཤིས་སྡིང་གི་ལོ་རྒྱུས། - Tashiding Chronicles', link: '#' },
    ],
  },
];

/* =========================
   Small utilities
   ========================= */
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(q.matches);
    onChange();
    if (q.addEventListener) q.addEventListener('change', onChange);
    else if (q.addListener) q.addListener(onChange);
    return () => {
      if (q.removeEventListener) q.removeEventListener('change', onChange);
      else if (q.removeListener) q.removeListener(onChange);
    };
  }, []);
  return reduced;
};

const useInView = (options = { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setInView(true);
            obs.unobserve(e.target);
          }
        });
      },
      options
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);
  return { ref, inView };
};

const RotatingWords = ({ words, interval = 2000, className = '' }) => {
  const reduced = usePrefersReducedMotion();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduced || words.length <= 1) return;
    const id = setInterval(() => setIdx(i => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [interval, words.length, reduced]);
  return (
    <span className={`inline-block relative h-[1em] overflow-y-hidden ${className}`}>
      <span
        key={idx}
        className="inline-block animate-wordSwap will-change-transform"
        style={{ animationDuration: reduced ? '0ms' : '800ms' }}
      >
        {words[idx]}
      </span>
    </span>
  );
};

const Accordion = ({ isOpen, onToggle, title, children, rightGlyph }) => {
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (isOpen) setHeight(innerRef.current?.scrollHeight || 'auto');
    else setHeight(0);
  }, [isOpen, children]);
  return (
    <div className="border border-orange-200 rounded-xl overflow-hidden bg-white/60 backdrop-blur-sm">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 bg-orange-50/70 hover:bg-orange-100/80 text-left font-medium text-orange-800 flex items-center justify-between transition-colors"
      >
        <span className="flex items-center gap-2">{title}</span>
        <span
          className={`text-xl leading-none transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          aria-hidden
        >
          {rightGlyph ?? '▾'}
        </span>
      </button>
      <div
        style={{ maxHeight: height, transition: 'max-height 320ms ease' }}
        className="overflow-hidden"
        aria-hidden={!isOpen}
      >
        <div ref={innerRef} className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

/* =========================
   Small presentational helpers
   ========================= */
const FadeUpSection = ({ children, className = '' }) => {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref}
      className={`${className} transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </section>
  );
};

const IconCard = ({ icon, title, desc }) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`text-center px-6 py-8 rounded-2xl border border-amber-200/60 bg-white/70 backdrop-blur-sm shadow-sm transition-all ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } hover:shadow-md hover:-translate-y-0.5`}
      style={{ transitionDuration: '700ms' }}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 mx-auto mb-4 grid place-items-center shadow-inner">
        {icon}
      </div>
      <h4 className="font-semibold text-lg mb-2">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
};

/* =========================
   Monastery card (fixes hook-in-loop)
   ========================= */
const MonasteryCard = ({ monastery, index, selectedTab, toggleTab }) => {
  const { ref, inView } = useInView();
  const keyHistory = `${monastery.name}-history`;
const keyAudio = `${monastery.name}-audio`;
const keyManu = `${monastery.name}-manuscripts`;

  return (
    <div
      ref={ref}
      className={`rounded-2xl shadow-xl overflow-hidden md:flex ${
        index % 2 === 1 ? 'md:flex-row-reverse' : ''
      } bg-white/80 backdrop-blur-sm border border-amber-200/50 transition-all ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDuration: '700ms' }}
    >
      {/* 360° View */}
      <div className="md:w-1/2 h-80 md:h-auto">
        <iframe
          title={monastery.name}
          src={monastery.iframeSrc}
          className="w-full h-full"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="md:w-1/2 p-8">
        <div className="flex items-center mb-4 text-orange-700">
          <MapPin className="w-5 h-5 mr-2" />
          <span className="font-medium">{monastery.location}</span>
        </div>

        <h4 className="text-2xl font-bold text-orange-800 mb-2">{monastery.name}</h4>
        <p className="text-amber-700 text-lg mb-1">{monastery.tibetan}</p>
        <p className="text-gray-600 mb-4 italic">Founded: {monastery.founded}</p>

        <div className="space-y-3">
          {/* History Tab */}
          <Accordion
            isOpen={!!selectedTab[keyHistory]}
            onToggle={() => toggleTab(monastery.name, 'history')}
            title={<span>ལོ་རྒྱུས། - Sacred History</span>}
            rightGlyph="⌄"
          >
            <p className="text-gray-700 leading-relaxed mb-2">{monastery.history}</p>
            <p className="text-orange-700 font-medium italic">{monastery.significance}</p>
          </Accordion>

          {/* Audio Tab */}
          <Accordion
            isOpen={!!selectedTab[keyAudio]}
            onToggle={() => toggleTab(monastery.name, 'audio')}
            title={
              <span className="flex items-center">
                <Volume2 className="w-4 h-4 mr-2" />
                སྐད་ཆ། - Audio Narration
              </span>
            }
            rightGlyph="⌄"
          >
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Hindi Narration:</p>
                <audio controls className="w-full">
                  <source src={monastery.audioLinks.hindi} type="audio/mp3" />
                </audio>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Nepali Narration:</p>
                <audio controls className="w-full">
                  <source src={monastery.audioLinks.nepali} type="audio/mp3" />
                </audio>
              </div>
            </div>
          </Accordion>

          {/* Manuscripts Tab */}
          <Accordion
            isOpen={!!selectedTab[keyManu]}
            onToggle={() => toggleTab(monastery.name, 'manuscripts')}
            title={
              <span className="flex items-center">
                <Book className="w-4 h-4 mr-2" />
                པོ་ཏི། - Sacred Manuscripts
              </span>
            }
            rightGlyph="⌄"
          >
            <ul className="space-y-2">
              {monastery.manuscripts.map((manuscript, idx) => (
                <li key={idx}>
                  <a
                    href={manuscript.link}
                    className="text-orange-600 hover:text-orange-800 hover:underline transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    {manuscript.title}
                  </a>
                </li>
              ))}
            </ul>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

/* =========================
   Main Page
   ========================= */
const Home = () => {
  const [selectedTab, setSelectedTab] = useState({});
  const reduced = usePrefersReducedMotion();

    const toggleTab = (monasteryName, tabName) => {
      const key = `${monasteryName}-${tabName}`;
      setSelectedTab(prev => ({
        ...prev,
        [key]: !prev[key],
      }));
  };

  const heroWords = useMemo(
    () => ['Sacred', 'Serene', 'Timeless', 'Ancient', 'Living'],
    []
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 text-gray-900">
        {/* Page-scoped keyframes + extras */}
        <style>{`
          @keyframes floatSlow { 0%{ transform: translateY(0px)} 50%{ transform: translateY(-10px)} 100%{ transform: translateY(0px)} }
          @keyframes glowPulse { 0%{ opacity:.5 } 50%{ opacity: 1 } 100%{ opacity:.5 } }
        @keyframes wordSwap { 
          0% { transform: translateY(100%); opacity:0 } 
          40% { transform: translateY(0%); opacity:1 } 
          100% { transform: translateY(0%); opacity:1 } 
        }
        .animate-floatSlow { animation: floatSlow 8s ease-in-out infinite }
        .animate-glowPulse { animation: glowPulse 6s ease-in-out infinite }
        .animate-wordSwap { animation: wordSwap 800ms ease forwards }
        .glass {
          background: linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.06));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,.18);
        }
      `}</style>

      {/* Navbar */}
     <Navbar/>
      {/* Hero */}
      <section
        className="relative py-20 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('/assets/images/hero_bg.jpg')",
          minHeight: '70vh',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/60 via-amber-800/50 to-orange-900/60"></div>
      <div
        className={`absolute inset-0 ${reduced ? '' : 'animate-glowPulse'}`}
        aria-hidden="true"
      >
        <div className="absolute top-10 left-10 text-amber-200/50 text-8xl animate-floatSlow">
        </div>
        <div
          className="absolute bottom-10 right-10 text-amber-200/50 text-8xl animate-floatSlow"
          style={{ animationDelay: '1.2s' }}
        >
          ༄
        </div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center text-white">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg will-change-transform transition-transform duration-700 hover:scale-[1.015]">
            བོད་ཀྱི་ཆོས་འཁོར།
          </h2>

          <p className="text-2xl md:text-3xl mb-4 font-light">
            <RotatingWords
              words={heroWords}
              className="align-middle"
            />
          </p>

          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-amber-50/95">
            Journey through Sikkim&apos;s ancient monasteries where prayers flutter with
            mountain winds, and centuries of wisdom echo through sacred halls nestled in
            the lap of the Himalayas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-orange-800 hover:bg-orange-700 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-[1.03] hover:shadow-lg active:scale-95">
              Begin Sacred Journey
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-orange-800 px-8 py-3 rounded-full font-semibold transition-all">
              དཀོན་མཆོག་གསུམ། - Triple Gem
            </button>
          </div>
        </div>
      </div>
      </section>

      {/* Cultural Context */}
      <FadeUpSection className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-orange-800 mb-4">
              སྤྱི་བོར་མཆོད་རྟེན། - Crown Jewel Monasteries
            </h3>
            <p className="text-gray-700 max-w-4xl mx-auto text-lg leading-relaxed">
              In the mystical land of Sikkim, where snow-capped peaks touch the heavens,
              ancient monasteries stand as beacons of Buddhist wisdom. Each gompa tells
              stories of devotion, preserving sacred texts, chants, and traditions passed
              down through generations of enlightened masters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <IconCard
              icon={<Mountain className="w-10 h-10 text-orange-600" />}
              title="རི་བོ་གང་དཀར། - Sacred Peaks"
              desc="Monasteries perched on divine mountains"
            />
            <IconCard
              icon={<Book className="w-10 h-10 text-orange-600" />}
              title="གསུང་རབ། - Sacred Texts"
              desc="Ancient manuscripts and teachings"
            />
            <IconCard
              icon={<Calendar className="w-10 h-10 text-orange-600" />}
              title="དུས་ཆེན། - Sacred Festivals"
              desc="Living traditions and celebrations"
            />
          </div>
        </div>
      </FadeUpSection>

      {/* Featured Monasteries */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-amber-100">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold text-orange-800 text-center mb-12">
            རྒྱལ་བའི་གདན་ས། - Seats of the Enlightened
          </h3>

          <div className="space-y-12">
            {monasteries.map((monastery, index) => (
              <MonasteryCard
                key={monastery.name}
                monastery={monastery}
                index={index}
                selectedTab={selectedTab}
                toggleTab={toggleTab}
              />
            ))}
          </div>
        </div>
      </section>
      <FloatingChatbot />

      {/* Footer */}
      <footer className="bg-orange-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg border-2 border-amber-200 mx-auto mb-4 will-change-transform transition-transform hover:scale-105">
              <div className="text-orange-800 font-bold text-2xl">སྐུ</div>
            </div>
            <h5 className="text-2xl font-bold mb-2">KoraView</h5>
            <p className="text-amber-200 mb-6">
              སྐུ་ལུང་བལ་གཡུལ། - Preserving the Sacred Heritage of Sikkim
            </p>
            <div className="border-t border-orange-700 pt-6">
              <p className="text-amber-300 text-sm">
                བཀྲ་ཤིས་བདེ་ལེགས། - May all beings be blessed with happiness and prosperity
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </>
  );
};

export default Home;