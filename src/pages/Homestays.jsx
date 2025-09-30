// src/pages/Homestays.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";

const homestaysData = [
  {
    _id: 1,
    name: "Mimah Homestay",
    location: "Gangtok, East Sikkim",
    description:
      "Family-run homestay in Gangtok with wooden interiors and local charm, close to MG Marg and city center.",
    thumbnail: "/assets/images/mimah1.webp",
    gallery: ["/assets/images/mimah2.webp"],
    pricePerNight: 1200,
    contact: "+91 9876543210",
    approved: true,
    audioGuides: [],
    videoGuides: [],
  },
  {
    _id: 2,
    name: "Tara Homestay",
    location: "Pelling, West Sikkim",
    description:
      "Peaceful homestay above Pelling town with panoramic mountain views. Hosts offer guided walks and local meals.",
    thumbnail: "/assets/images/tara1.jpg",
    gallery: ["/assets/images/tara2.jpg"],
    pricePerNight: 1500,
    contact: "+91 9876543211",
    approved: true,
    audioGuides: [],
    videoGuides: [],
  },
  {
    _id: 3,
    name: "Sonam’s Homestay",
    location: "Lachung, North Sikkim",
    description:
      "Authentic village vibe run by an apple farmer. Guests can explore orchards and experience local culture.",
    thumbnail: "/assets/images/sonam1.jpg",
    gallery: ["/assets/images/sonam2.jpg"],
    pricePerNight: 1800,
    contact: "+91 9876543212",
    approved: true,
    audioGuides: [],
    videoGuides: [],
  },
  {
    _id: 4,
    name: "Yangsum Heritage Farmhouse",
    location: "Rinchenpong, West Sikkim",
    description:
      "A heritage farmhouse blending Sikkimese history with comfort. Organic farm meals and cultural shows available.",
    thumbnail: "/assets/images/yangsum1.webp",
    gallery: ["/assets/images/yangsum2.webp"],
    pricePerNight: 2500,
    contact: "+91 9876543213",
    approved: true,
    audioGuides: [],
    videoGuides: [],
  },
  {
    _id: 5,
    name: "Gonpad Lama’s Homestay",
    location: "Dzongu, North Sikkim",
    description:
      "Located in the Lepcha tribal region, offering immersive local experiences like cooking, foraging, and guided walks.",
    thumbnail: "/assets/images/lama1.jpg",
    gallery: ["/assets/images/lama2.webp"],
    pricePerNight: 2000,
    contact: "+91 9876543214",
    approved: true,
    audioGuides: [],
    videoGuides: [],
  },
  {
    _id: 6,
    name: "Munsell Homestay",
    location: "Ravangla, South Sikkim",
    description:
      "Nestled in a spice & vegetable plantation, this homestay offers serenity, valley views, and home-cooked meals.",
    thumbnail: "/assets/images/munsell1.webp",
    gallery: ["/assets/images/munsell2.webp"],
    pricePerNight: 1600,
    contact: "+91 9876543215",
    approved: true,
    audioGuides: [],
    videoGuides: [],
  },
];

export default function Homestays() {
  const [homestays] = useState(homestaysData);
  const [selected, setSelected] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openModal = (hs) => {
    setSelected(hs);
    setGalleryIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelected(null);
    document.body.style.overflow = "";
  };

  const nextImage = () => {
    if (!selected) return;
    setGalleryIndex((i) => (i + 1) % selected.gallery.length);
  };

  const prevImage = () => {
    if (!selected) return;
    setGalleryIndex(
      (i) => (i - 1 + selected.gallery.length) % selected.gallery.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative py-24 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/assets/images/homestay_hero.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-700/80 via-orange-600/70 to-amber-800/80"></div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Discover Local Homestays / स्थानीय आवासहरू
          </h1>
          <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Stay with welcoming families, experience authentic Sikkimese culture, and support local
            communities. / आत्मीय परिवारसँग बस्नुहोस् र असली सिक्किमेली संस्कृति अनुभव गर्नुहोस्।
          </p>
          <button className="bg-white text-orange-700 font-semibold px-8 py-3 rounded-2xl shadow hover:bg-orange-100 transition">
            Explore Homestays
          </button>
        </div>
      </section>

      {/* Homestay Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {homestays.map((hs) => (
            <article
              key={hs._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100 hover:shadow-xl transition"
            >
              {/* Image */}
              <div className="relative h-56">
                <img
                  src={hs.thumbnail}
                  alt={hs.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute left-3 top-3 bg-white/90 text-xs rounded-lg px-2 py-1 font-medium text-gray-800 shadow">
                  {hs.location}
                </div>
                <div className="absolute right-3 top-3">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-lg shadow">
                    {hs.approved ? "Verified" : "Pending"}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-orange-900">{hs.name}</h3>
                <p className="text-gray-600 mt-3 text-sm line-clamp-3">
                  {hs.description}
                </p>

                {/* Price + Buttons */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="text-sm text-gray-800 font-medium">
                    ₹{hs.pricePerNight}
                    <span className="text-xs text-gray-500"> / night</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(hs)}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1.5 rounded-lg shadow hover:opacity-90 transition"
                    >
                      View
                    </button>
                    <a
                      href={`tel:${hs.contact.replace(/\s+/g, "")}`}
                      className="bg-orange-50 text-orange-800 px-4 py-1.5 rounded-lg shadow hover:bg-orange-100 transition"
                    >
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-6">
          {/* Background */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal Box */}
          <div className="relative z-50 w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Gallery */}
              <div className="md:w-1/2 bg-black/5">
                <div className="relative h-64 md:h-[420px] bg-gray-200">
                  <img
                    src={selected.gallery[galleryIndex]}
                    alt={`${selected.name} ${galleryIndex + 1}`}
                    className="object-cover w-full h-full"
                  />
                  {selected.gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                      >
                        ‹
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>
                {selected.gallery.length > 1 && (
                  <div className="flex gap-3 p-4 overflow-x-auto">
                    {selected.gallery.map((g, i) => (
                      <button
                        key={i}
                        onClick={() => setGalleryIndex(i)}
                        className={`w-20 h-14 shrink-0 rounded-lg overflow-hidden border transition ${
                          i === galleryIndex
                            ? "border-orange-500"
                            : "border-gray-200"
                        }`}
                      >
                        <img
                          src={g}
                          alt={`thumb-${i}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="md:w-1/2 p-8 flex flex-col">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-orange-900">
                      {selected.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {selected.location}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-800 bg-gray-100 p-2 rounded-full"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-gray-700 mt-5 leading-relaxed">
                  {selected.description}
                </p>

                <div className="mt-6">
                  <div className="text-sm text-gray-600">Price per night</div>
                  <div className="text-xl font-semibold text-orange-800">
                    ₹{selected.pricePerNight}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm text-gray-600">Contact</div>
                  <a
                    href={`tel:${selected.contact.replace(/\s+/g, "")}`}
                    className="text-orange-600 font-medium"
                  >
                    {selected.contact}
                  </a>
                </div>

                {/* Guides */}
                <div className="mt-6 space-y-4">
                  {selected.audioGuides?.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Audio Guide</div>
                      {selected.audioGuides.map((a, idx) => (
                        <audio key={idx} controls className="w-full mt-1">
                          <source src={a} />
                        </audio>
                      ))}
                    </div>
                  )}
                  {selected.videoGuides?.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Video Guide</div>
                      {selected.videoGuides.map((v, idx) => (
                        <video key={idx} controls className="w-full rounded">
                          <source src={v} />
                        </video>
                      ))}
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-auto flex items-center gap-4 pt-8">
                  <a
                    href={`tel:${selected.contact.replace(/\s+/g, "")}`}
                    className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-2 rounded-lg shadow hover:opacity-90"
                  >
                    Book Now
                  </a>
                  <button
                    onClick={() =>
                      alert("📞 Your call request has been sent to the host!")
                    }
                    className="bg-orange-50 text-orange-800 px-6 py-2 rounded-lg shadow hover:bg-orange-100"
                  >
                    Request Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
