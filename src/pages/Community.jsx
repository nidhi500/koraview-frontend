// src/pages/Community.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaUserNinja, FaUsers, FaBook, FaTimes } from "react-icons/fa";
import Navbar from "../components/Navbar";

/* =========================
   Inline useInView Hook
   ========================= */
const useInView = (options = { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      options
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
};

export default function Community({ user, onLogout }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({});
  const [filePreview, setFilePreview] = useState(null);
  const [heights, setHeights] = useState([]);

  /* =========================
     Community Roles Data
     ========================= */
  const communityRoles = [
    {
      role: "Monk",
      color: "bg-indigo-100",
      icon: <FaUserNinja size={40} className="text-indigo-600" />,
      desc: "Monks can contribute ritual videos, chants, and oral histories.",
      bullets: [
        "Share ritual videos and sacred chants.",
        "Document oral histories and monastery traditions.",
        "Help tourists understand spiritual heritage."
      ]
    },
    {
      role: "Local",
      color: "bg-green-100",
      icon: <FaUsers size={40} className="text-green-600" />,
      desc: "Local residents can share homestay listings, handicrafts, personal stories, and photographs.",
      bullets: [
        "List homestays / आवासहरू साझा गर्नुहोस्.",
        "Upload handicrafts or traditional items.",
        "Share stories and photos of your community."
      ]
    },
    {
      role: "Researcher",
      color: "bg-yellow-100",
      icon: <FaBook size={40} className="text-yellow-600" />,
      desc: "Researchers can upload scanned manuscripts, research notes, or transcription work.",
      bullets: [
        "Upload manuscript scans / पाण्डुलिपिहरू स्क्यान गर्नुहोस्.",
        "Share research notes or findings.",
        "Transcriptions to help document heritage."
      ]
    }
  ];

  /* =========================
     Handlers
     ========================= */
  const openModal = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
    setFormData({});
    setFilePreview(null);
  };
  const closeModal = () => setModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFilePreview(reader.result);
    reader.readAsDataURL(file);
    setFormData({ ...formData, file });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", selectedRole, formData);
    alert(`Submitted contribution for ${selectedRole}. It will appear in the gallery after review.`);
    closeModal();
  };

  /* =========================
     Role Card Component
     ========================= */
  const RoleCard = ({ role, icon, color, desc, bullets, onClick }) => {
  const { ref: inViewRef, inView } = useInView();

  return (
    <div
      ref={inViewRef}
      className={`flex flex-col justify-between p-6 rounded-3xl shadow-lg ${color} hover:shadow-2xl transition transform hover:-translate-y-1 min-h-[380px]`}
    >
      <div>
        <div className="flex items-center gap-4 mb-4">
          {icon}
          <h3 className="text-2xl font-bold">{role}</h3>
        </div>
        <p className="text-gray-700 mb-3">{desc}</p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          {(bullets || []).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center mt-2">
        <button
          onClick={onClick}
          className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-2xl shadow transition-all"
        >
          Contribute Now / अब योगदान गर्नुहोस्
        </button>
      </div>
    </div>
  );
};

  const maxHeight = Math.max(...heights, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 text-gray-900">
      <Navbar user={user} onLogout={onLogout} />

      {/* Hero */}
     <section
  className="relative py-24 bg-cover bg-center bg-no-repeat overflow-hidden"
  style={{
    backgroundImage: "url('/assets/images/community_hero.avif')",
    backgroundSize: "cover",   // fills while maintaining aspect ratio
    backgroundPosition: "center", // keeps subject centered
  }}
>

        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 via-amber-800/50 to-orange-900/70"></div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Community Contributions / समुदायमा योगदान
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Share your experiences, knowledge, and culture to preserve Sikkim’s rich heritage. / आफ्नो अनुभव, ज्ञान र संस्कृति साझा गर्नुहोस्।
          </p>
        </div>
      </section>

      {/* Cards */}
      {/* Cards */}
<section className="py-16">
  <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
    {(communityRoles || []).map((r) => (
      <RoleCard key={r.role} {...r} onClick={() => openModal(r.role)} />
    ))}
  </div>
</section>


      {/* Modal Form */}
{modalOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto relative transition-transform transform scale-95 animate-fadeIn">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <FaTimes className="text-2xl" />
      </button>

      {/* Modal Header */}
      <h3 className="text-3xl font-bold mb-6 text-orange-800 text-center">
        Contribute as {selectedRole} / {selectedRole === 'Monk' ? 'भिक्षु' : selectedRole === 'Local' ? 'स्थानीय' : 'अनुसन्धाता'}
      </h3>
      <p className="text-center text-gray-700 mb-6">
        Share your knowledge and experience to preserve Sikkim’s heritage. / आफ्नो ज्ञान र अनुभव साझा गर्नुहोस्।
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Monk */}
        {selectedRole === "Monk" && (
          <>
            <input
              required
              name="name"
              placeholder="Full Name / पूरा नाम"
              onChange={handleChange}
              className="w-full p-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 placeholder-gray-400"
            />
            <select
              required
              name="monastery"
              onChange={handleChange}
              className="w-full p-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Monastery / मठ छान्नुहोस्</option>
              <option value="Rumtek">Rumtek</option>
              <option value="Pemayangtse">Pemayangtse</option>
              <option value="Tashiding">Tashiding</option>
              <option value="Enchey">Enchey</option>
            </select>
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
            />
            <select
              required
              name="contributionType"
              onChange={handleChange}
              className="w-full p-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Contribution Type / योगदान प्रकार</option>
              <option value="Ritual Video">Ritual Video</option>
              <option value="Chant Audio">Chant Audio</option>
              <option value="Oral History">Oral History</option>
            </select>
            <input
              type="file"
              accept="video/*,audio/*,.txt"
              onChange={handleFileChange}
              className="w-full rounded-xl"
            />
            <textarea
              placeholder="Additional Notes / थप टिप्पणी"
              name="notes"
              onChange={handleChange}
              className="w-full p-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 h-28"
            />
          </>
        )}

        {/* Local */}
        {selectedRole === "Local" && (
          <>
            <input
              required
              name="name"
              placeholder="Full Name / पूरा नाम"
              onChange={handleChange}
              className="w-full p-4 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-400"
            />
            <select
              required
              name="town"
              onChange={handleChange}
              className="w-full p-4 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Town/Village / नगर वा गाउँ छान्नुहोस्</option>
              <option value="Gangtok">Gangtok</option>
              <option value="Pelling">Pelling</option>
              <option value="Namchi">Namchi</option>
              <option value="Gyalshing">Gyalshing</option>
            </select>
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-4 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-400"
            />
            <select
              required
              name="contributionType"
              onChange={handleChange}
              className="w-full p-4 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-400"
            >
              <option value="">Contribution Type / योगदान प्रकार</option>
              <option value="Homestay">Homestay</option>
              <option value="Handicraft">Handicraft</option>
              <option value="Story">Story</option>
              <option value="Photo">Photo</option>
            </select>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="w-full rounded-xl"
            />
            <textarea
              placeholder="Additional Notes / थप टिप्पणी"
              name="notes"
              onChange={handleChange}
              className="w-full p-4 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-400 h-28"
            />
          </>
        )}

        {/* Researcher */}
        {selectedRole === "Researcher" && (
          <>
            <input
              required
              name="name"
              placeholder="Full Name / पूरा नाम"
              onChange={handleChange}
              className="w-full p-4 border border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-400"
            />
            <input
              required
              name="institution"
              placeholder="Institution / संस्था"
              onChange={handleChange}
              className="w-full p-4 border border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-400"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-4 border border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-400"
            />
            <select
              required
              name="contributionType"
              onChange={handleChange}
              className="w-full p-4 border border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Contribution Type / योगदान प्रकार</option>
              <option value="Manuscript Scan">Manuscript Scan</option>
              <option value="Research Notes">Research Notes</option>
              <option value="Transcription">Transcription</option>
            </select>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="w-full rounded-xl"
            />
            <textarea
              placeholder="Additional Notes / थप टिप्पणी"
              name="notes"
              onChange={handleChange}
              className="w-full p-4 border border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-400 h-28"
            />
          </>
        )}

        {/* File Preview */}
        {filePreview && (
          <div className="mt-4">
            {filePreview.startsWith("data:video") ? (
              <video controls className="w-full max-h-64 rounded-xl shadow-md">
                <source src={filePreview} />
              </video>
            ) : (
              <img
                src={filePreview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-xl shadow-md"
              />
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all"
        >
          Submit / पेश गर्नुहोस्
        </button>
      </form>
    </div>
  </div>
)}

    </div>
  );
}
