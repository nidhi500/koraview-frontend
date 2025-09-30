import React, { useState, useMemo } from "react";
import MonasteryCard from "../components/MonasteryCard";
import Navbar from "../components/Navbar";

const monasteries = [
  {
    name: "Pemayangtse Monastery",
    location: { lat: "27.32", lng: "88.24" },
    thumbnail: "/assets/images/pemayangtse.jpg",
    panoramas: {
      inside: "https://www.360cities.net/embed_iframe/pemayangtse-monastery-in-sikkim",
      outside: "https://www.360cities.net/embed_iframe/pemayangtse-monastery-in-sikkim",
    },
    description:
      "Pemayangtse Monastery, built in the 17th century, is one of the oldest and most important Nyingma monasteries in Sikkim. It was founded by Lhatsun Chenpo and serves as the seat of the Nyingma order.",
    audio: {
      english: "/assets/audio/pemayangtse-english.mp3",
      hindi: "/assets/audio/pemayangtse-hindi.mp3",
      nepali: "/assets/audio/pemayangtse-nepali.mp3",
    },
    archives: [
      { id: 1, title: "Ancient Tibetan Text 1", image: "/assets/images/monastery1.jpg" },
      { id: 2, title: "Buddhist Manuscript Archive", image: "/assets/images/monastery2.jpg" },
    ],
  },
  {
    name: "Rumtek Monastery",
    location: { lat: "27.33", lng: "88.61" },
    thumbnail: "/assets/images/rumtek.jpg",
    panoramas: {
      inside: "https://www.360cities.net/embed_iframe/rumtek-monastery-sikkim",
      outside: "https://www.360cities.net/embed_iframe/rumtek-monastery-sikkim",
    },
    description:
      "Rumtek Monastery is the largest monastery in Sikkim and is the seat of the Karmapa Lama. Originally built in the 16th century, it was reconstructed in the 1960s.",
    audio: {
      english: "/assets/audio/pemayangtse-english.mp3",
      hindi: "/assets/audio/pemayangtse-hindi.mp3",
      nepali: "/assets/audio/pemayangtse-nepali.mp3",
    },
    archives: [
      { id: 1, title: "Karmapa Texts", image: "/assets/images/monastery1.jpg" },
      { id: 2, title: "Buddhist Sutras", image: "/assets/images/monastery2.jpg" },
    ],
  },
  {
    name: "Tashiding Monastery",
    location: { lat: "27.15", lng: "88.33" },
    thumbnail: "/assets/images/tashiding_thumb.jpg",
    panoramas: {
      inside: "https://www.360cities.net/embed_iframe/tashiding-monastery-sikkim",
      outside: "https://www.360cities.net/embed_iframe/tashiding-monastery-sikkim",
    },
    description:
      "Tashiding Monastery is an important pilgrimage site in Sikkim, built in the 17th century. It is renowned for its sacred rituals and festivals.",
    audio: {
      english: "/assets/audio/pemayangtse-english.mp3",
      hindi: "/assets/audio/pemayangtse-hindi.mp3",
      nepali: "/assets/audio/pemayangtse-nepali.mp3",
    },
    archives: [
      { id: 1, title: "Tashiding Scrolls", image: "/assets/images/monastery1.jpg" },
      { id: 2, title: "Buddhist Archives", image: "/assets/images/monastery2.jpg" },
    ],
  },
];

const Explore = () => {
  const [selectedTab, setSelectedTab] = useState({});
  const heroWords = useMemo(() => ["Explore", "Discover", "Learn"], []);

  const toggleTab = (monasteryName, tabName) => {
    const key = `${monasteryName}-${tabName}`;
    setSelectedTab((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative py-24 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/assets/images/hero_bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/60 via-amber-800/50 to-orange-900/60"></div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Explore Monasteries of Sikkim
          </h1>
          <p className="text-2xl md:text-3xl mb-6 font-light">
            <span className="inline-block relative h-[1em] overflow-y-hidden">
              <span className="inline-block animate-wordSwap">{heroWords[0]}</span>
            </span>
          </p>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-amber-50/95 mb-8">
            Discover the rich spiritual heritage of Sikkim through interactive 360° views, history, audio narration, and ancient manuscripts.
          </p>
        </div>
      </section>

      {/* Monastery Cards */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {monasteries.map((m) => (
            <MonasteryCard
              key={m.name}
              monastery={m}
              selectedTab={selectedTab}
              toggleTab={toggleTab}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg border-2 border-amber-200 mx-auto mb-4 font-bold text-orange-800">
            Logo
          </div>
          <h5 className="text-2xl font-bold mb-2">KoraView</h5>
          <p className="text-amber-200 mb-6">Preserving the Sacred Heritage of Sikkim</p>
          <div className="border-t border-orange-700 pt-6">
            <p className="text-amber-300 text-sm">© 2025 All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Page-scoped keyframes */}
      <style>{`
        @keyframes wordSwap { 0% { transform: translateY(100%); opacity:0 } 40% { transform: translateY(0%); opacity:1 } 100% { transform: translateY(0%); opacity:1 } }
        .animate-wordSwap { animation: wordSwap 800ms ease forwards }
      `}</style>
    </div>
  );
};

export default Explore;
