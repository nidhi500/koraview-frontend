// src/pages/Handicrafts.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";

const handicraftList = [
  {
    id: 1,
    name: "Thangka Painting",
    location: "Gangtok, East Sikkim",
    description:
      "Traditional Tibetan Buddhist scroll paintings, often depicting deities and mandalas. Crafted with natural pigments and fine cotton or silk.",
    thumbnail: "/assets/images/thangka1.jpg",
    gallery: [
      "/assets/images/thangka1.jpg",
      "/assets/images/thangka2.webp",
      "/assets/images/thangka3.jpg",
    ],
    price: "₹2500 onwards",
    contact: "+91 9880011111",
    approved: true,
  },
  {
    id: 2,
    name: "Wood Carving",
    location: "Namchi, South Sikkim",
    description:
      "Exquisite hand-carved wooden masks, figures, and panels used in monasteries and traditional homes.",
    thumbnail: "/assets/images/wood1.jpg",
    gallery: ["/assets/images/wood1.jpg", "/assets/images/wood2.jpg", "/assets/images/wood3.jpg"],
    price: "₹1500 onwards",
    contact: "+91 9880011112",
    approved: true,
  },
  {
    id: 3,
    name: "Carpet Weaving",
    location: "Ravangla, South Sikkim",
    description:
      "Handwoven wool carpets featuring dragon, floral, and geometric motifs. A blend of Tibetan and Sikkimese designs.",
    thumbnail: "/assets/images/carpet1.jpg",
    gallery: ["/assets/images/carpet1.jpg", "/assets/images/carpet2.webp", "/assets/images/carpet3.jpg"],
    price: "₹3000 onwards",
    contact: "+91 9880011113",
    approved: true,
  },
  {
    id: 4,
    name: "Bamboo & Cane Crafts",
    location: "Dzongu, North Sikkim",
    description:
      "Sustainable and eco-friendly crafts including baskets, trays, furniture, and decorative items made by Lepcha artisans.",
    thumbnail: "/assets/images/bamboo1.webp",
    gallery: ["/assets/images/bamboo1.webp", "/assets/images/bamboo2.jpg", "/assets/images/bamboo3.webp"],
    price: "₹500 onwards",
    contact: "+91 9880011114",
    approved: true,
  },
  {
    id: 5,
    name: "Choktse Tables",
    location: "Gangtok, East Sikkim",
    description:
      "Intricately carved foldable wooden tables, usually painted with dragons, flowers, and Buddhist symbols.",
    thumbnail: "/assets/images/choktse1.jpg",
    gallery: ["/assets/images/choktse1.jpg", "/assets/images/choktse2.png", "/assets/images/choktse3.jpg"],
    price: "₹4000 onwards",
    contact: "+91 9880011115",
    approved: true,
  },
  {
    id: 6,
    name: "Handloom Shawls",
    location: "Namchi, South Sikkim",
    description:
      "Beautiful handwoven woollen shawls and blankets made with traditional looms, popular for their warmth and designs.",
    thumbnail: "/assets/images/shawl1.jpg",
    gallery: ["/assets/images/shawl1.jpg", "/assets/images/shawl2.jpg", "/assets/images/shawl3.jpg"],
    price: "₹1200 onwards",
    contact: "+91 9880011116",
    approved: true,
  },
];



export default function Handicrafts() {
  const [handicrafts] = useState(handicraftList);
  const [selected, setSelected] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openModal = (item) => {
    setSelected(item);
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
    setGalleryIndex((i) => (i - 1 + selected.gallery.length) % selected.gallery.length);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />

      {/* Hero Section */}
       <section
  className="relative py-24 bg-cover bg-center overflow-hidden"
  style={{ backgroundImage: "url('/assets/images/handicrafts_hero.webp')" }}
>
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-amber-800/80 via-orange-700/70 to-green-800/80"></div>

  {/* Content */}
  <div className="container mx-auto px-6 relative z-10 text-center text-white">
    <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
      Explore Sikkim Handicrafts / सिक्किमका हस्तकला
    </h1>
    <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
      Discover timeless artistry — from Thangka paintings to bamboo crafts — supporting
      local artisans and preserving cultural heritage. / ठाङ्का चित्रदेखि बाँसका
      हस्तकलासम्म, स्थानीय कलाकारलाई समर्थन गर्नुहोस् र सांस्कृतिक सम्पदा जोगाउनुहोस्।
    </p>
    <button className="bg-white text-orange-700 font-semibold px-8 py-3 rounded-2xl shadow hover:bg-orange-100 transition">
      Explore Handicrafts
    </button>
  </div>
</section>


      {/* Handicrafts Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {handicrafts.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="relative h-48">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute left-3 top-3 bg-white/80 text-xs rounded px-2 py-1 font-medium text-gray-800">
                  {item.location}
                </div>
                <div className="absolute right-3 top-3">
                  <span className="bg-green-700 text-white text-xs px-2 py-1 rounded">
                    {item.approved ? "Verified" : "Pending"}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 mt-2 line-clamp-3">{item.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-700 font-medium">{item.price}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(item)}
                      className="bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-700 transition"
                    >
                      View
                    </button>
                    <a
                      href={`tel:${item.contact.replace(/\s+/g, "")}`}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-lg hover:bg-green-200 transition"
                    >
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal (same as before) */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-6">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="relative z-50 w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left: Gallery */}
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
                  <div className="flex gap-2 p-3 overflow-x-auto">
                    {selected.gallery.map((g, i) => (
                      <button
                        key={i}
                        onClick={() => setGalleryIndex(i)}
                        className={`w-20 h-12 shrink-0 rounded overflow-hidden border ${
                          i === galleryIndex
                            ? "border-orange-600"
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

              {/* Right: Details */}
              <div className="md:w-1/2 p-6 flex flex-col">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-orange-800">
                      {selected.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">{selected.location}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-800 bg-gray-100 p-2 rounded-full"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-gray-700 mt-4">{selected.description}</p>

                <div className="mt-4">
                  <div className="text-sm text-gray-600">Price</div>
                  <div className="text-xl font-semibold text-brown-700">
                    {selected.price}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm text-gray-600">Contact</div>
                  <a
                    href={`tel:${selected.contact.replace(/\s+/g, "")}`}
                    className="text-green-700 font-medium"
                  >
                    {selected.contact}
                  </a>
                </div>

                <div className="mt-auto flex items-center gap-3 pt-6">
                  <a
                    href={`tel:${selected.contact.replace(/\s+/g, "")}`}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
                  >
                    Buy Now
                  </a>
                  <button
                    onClick={() => alert("Request sent to artisan (demo)")}
                    className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg hover:bg-orange-200"
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
