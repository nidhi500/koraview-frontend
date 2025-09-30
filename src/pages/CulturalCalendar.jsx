// src/pages/CulturalCalendar.jsx
import React, { useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import Navbar from "../components/Navbar";
import { Calendar, MapPin, Book } from "lucide-react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

/* =========================
   Small Presentational Components
   ========================= */
const FadeUpSection = ({ children, className = "" }) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setInView(true), 150);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <section
      className={`${className} transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </section>
  );
};

const IconCard = ({ icon, title, desc }) => (
  <div className="text-center px-6 py-6 rounded-2xl border border-amber-200/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 mx-auto mb-4 grid place-items-center shadow-inner">
      {icon}
    </div>
    <h4 className="font-semibold text-lg mb-2">{title}</h4>
    <p className="text-gray-700">{desc}</p>
  </div>
);

const CulturalCalendar = ({ user, onLogout }) => {
  const [events, setEvents] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");

  const nepaliMonths = [
    "बैशाख","जेठ","असार","साउन","भदौ","आश्विन",
    "कार्तिक","मंसिर","पौष","माघ","फाल्गुण","चैत"
  ];

  useEffect(() => {
    setEvents([
      {
        id: "e1",
        name: "Losar (Tibetan New Year) / लोसार",
        date: "2026-02-20",
        type: "festival",
        monastery: "Rumtek Monastery",
        description:
          "Losar is the Tibetan New Year celebrated with prayers, traditional dances, and local delicacies. / यो तिब्बती नयाँ वर्ष हो, जहाँ पूजा, परम्परागत नाच र स्थानीय परिकारहरूको रमाइलो हुन्छ।",
        images: ["/assets/images/losar.webp", "/assets/images/losar2.jpg"]
      },
      {
        id: "e2",
        name: "Saga Dawa / सागा दावा",
        date: "2026-05-15",
        type: "festival",
        monastery: "Tashiding Monastery",
        description:
          "Saga Dawa celebrates Buddha’s birth, enlightenment, and passing. / बुद्धको जन्म, ज्ञानप्राप्ति र निर्वाण सम्झनाको उत्सव।",
        images: ["/assets/images/saga.jpg", "/assets/images/saga2.webp"]
      },
      {
        id: "e3",
        name: "Drupka Teshi / ड्रुप्का तेसी",
        date: "2026-07-10",
        type: "ritual",
        monastery: "Rumtek Monastery",
        description:
          "Drupka Teshi commemorates an important event in the life of Buddha. / बुद्धको जीवनमा महत्वपूर्ण घटनाको सम्झना।",
        images: ["/assets/images/drukpa.jpg", "/assets/images/drukpa2.jpg"]
      },
      {
        id: "e4",
        name: "Cham Dance Festival / चाम नाच",
        date: "2026-03-05",
        type: "festival",
        monastery: "Pemayangtse Monastery",
        description:
          "Cham Dance is a sacred ritual dance performed by monks wearing elaborate masks. / यो नाच शुभ कार्य र बुरी शक्तिको विनाशको प्रतीक हो।",
        images: ["/assets/images/cham_dance.webp", "/assets/images/cham_dance2.jpg"]
      },
      {
        id: "e5",
        name: "Bhumchu Ceremony / भुम्चु समारोह",
        date: "2026-09-12",
        type: "ritual",
        monastery: "Tashiding Monastery",
        description:
          "Bhumchu is a sacred ritual of filling and predicting the sacred water in a vase. / भुम्चु एक पवित्र परम्परा हो जसमा मठको भविष्य र आशीर्वादको संकेत पाइन्छ।",
        images: ["/assets/images/bumchu.jpg", "/assets/images/bhumchu2.jpg"]
      },
    ]);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    adaptiveHeight: true
  };

  const filteredEvents = events.filter((ev) => {
    const matchesType = selectedType === "all" || ev.type === selectedType;
    const matchesMonth =
      selectedMonth === "all" ||
      new Date(ev.date).getMonth() + 1 === Number(selectedMonth);
    return matchesType && matchesMonth;
  });

  const handleBook = (ev) => alert(`Booking stub for ${ev.name} on ${ev.date}.`);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 text-gray-900">
      <Navbar user={user} onLogout={onLogout} />

      {/* Hero */}
     {/* Hero Section */}
<section
  className="relative py-32 bg-cover bg-center overflow-hidden"
  style={{ backgroundImage: "url('/assets/images/cultural_hero.jpg')" }}
>
  {/* Dark overlay with gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 via-amber-900/50 to-orange-900/80"></div>

  {/* Content container */}
  <div className="container mx-auto px-6 relative z-10 text-center text-white">
    <FadeUpSection className="max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
        Sikkim Cultural Festivals & Rituals <br />
        <span className="text-amber-300">सिक्किमका सांस्कृतिक पर्व र रीतिरिवाज</span>
      </h1>
      <p className="text-lg md:text-2xl mb-8 leading-relaxed">
        Explore the rich heritage of Sikkim’s monasteries and traditions. <br />
        <span className="text-amber-100">मठ र परम्पराहरूको धरोहर अन्वेषण गर्नुहोस्।</span>
      </p>

      <a
        href="#filters"
        className="inline-block bg-amber-500 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-3xl shadow-lg transition-transform hover:scale-105"
      >
        Explore Events / इभेन्टहरू अन्वेषण गर्नुहोस्
      </a>
    </FadeUpSection>
  </div>
</section>


      {/* Filters */}
      <FadeUpSection className="py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-6">
          <div className="col-span-1 bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-md border border-amber-200/60">
            <h3 className="text-xl font-semibold text-orange-800 mb-4">Filters / फिल्टरहरू</h3>
            <div className="mb-4">
              <label className="text-gray-700 mb-1 block">Event Type / प्रकार</label>
              <select
                className="w-full border rounded p-2 hover:border-orange-500 transition"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All / सबै</option>
                <option value="festival">Festival / पर्व</option>
                <option value="ritual">Ritual / रिति</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-gray-700 mb-1 block">Month / महिना</label>
              <select
                className="w-full border rounded p-2 hover:border-orange-500 transition"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="all">All / सबै</option>
                {nepaliMonths.map((m, i) => (
                  <option key={i} value={i + 1}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Event Cards */}
          <div className="md:col-span-3 grid md:grid-cols-2 gap-6">
            {filteredEvents.length === 0 && (
              <div className="text-gray-500 text-center col-span-2 mt-10">
                No events found / चयनित फिल्टर अनुसार इभेन्ट छैन
              </div>
            )}
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden flex flex-col transition-transform hover:scale-105 hover:shadow-lg"
              >
                <Slider {...sliderSettings}>
                  {ev.images.map((img, idx) => (
                    <img key={idx} src={img} alt={ev.name} className="w-full h-56 object-cover"/>
                  ))}
                </Slider>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold text-orange-800">{ev.name}</h3>
                  <p className="text-sm text-gray-600 italic">{ev.type} @ {ev.monastery}</p>
                  <p className="mt-2 text-gray-700">{ev.description}</p>
                  <button
                    onClick={() => handleBook(ev)}
                    className="mt-4 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-2xl shadow-md transition-transform hover:scale-105"
                  >
                    Book Now / बुक गर्नुहोस्
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeUpSection>
    </div>
  );
};

export default CulturalCalendar;
