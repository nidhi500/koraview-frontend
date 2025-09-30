// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function AdminDashboard() {
  // Hardcoded Monasteries
  const [monasteries, setMonasteries] = useState([
    {
      _id: "1",
      name: "Pemayangtse Monastery",
      location: { lat: 27.3722, lng: 88.235 },
      thumbnail: "/assets/images/pemayangtse.jpg",
      description: "Pemayangtse Monastery is one of the oldest in Sikkim...",
      audio: [
        { lang: "English", file: "/assets/audio/pemayangtse-english.mp3" },
        { lang: "Hindi", file: "/assets/audio/pemayangtse-hindi.mp3" },
        { lang: "Nepali", file: "/assets/audio/pemayangtse-nepali.mp3" },
      ],
      video: "/assets/video/sample1.mp4",
      manuscripts: ["/assets/images/monastery1.jpg", "/assets/images/monastery2.jpg"],
      approved: false,
    },
    {
      _id: "2",
      name: "Tashiding Monastery",
      location: { lat: 27.32, lng: 88.45 },
      thumbnail: "/assets/images/tashiding_thumb.jpg",
      description: "Tashiding Monastery is famous for its spiritual significance...",
      audio: [
        { lang: "English", file: "/assets/audio/pemayangtse-english.mp3" },
        { lang: "Hindi", file: "/assets/audio/pemayangtse-hindi.mp3" },
        { lang: "Nepali", file: "/assets/audio/pemayangtse-nepali.mp3" },
      ],
      video: "/assets/video/sample1.mp4",
      manuscripts: ["/assets/images/monastery1.jpg", "/assets/images/monastery2.jpg"],
      approved: false,
    },
    {
      _id: "3",
      name: "Rumtek Monastery",
      location: { lat: 27.3389, lng: 88.6065 },
      thumbnail: "/assets/images/rumtek.jpg",
      description: "Rumtek is a famous monastery in Sikkim...",
      audio: [
        { lang: "English", file: "/assets/audio/pemayangtse-english.mp3" },
        { lang: "Hindi", file: "/assets/audio/pemayangtse-hindi.mp3" },
        { lang: "Nepali", file: "/assets/audio/pemayangtse-nepali.mp3" },
      ],
      video: null,
      manuscripts: ["/assets/images/monastery1.jpg", "/assets/images/monastery2.jpg"],
      approved: false,
    },
  ]);

  // Hardcoded Contributions
  const [contributions, setContributions] = useState({
    monks: [
      {
        _id: "m1",
        type: "monks",
        title: "Preservation of Sacred Manuscripts",
        submittedBy: "Lama Tenzin",
        content:
          "This contribution highlights the urgent need to digitize ancient texts stored in Pemayangtse Monastery.",
        files: [
          { name: "Manuscript Photo", url: "/assets/images/monastery1.jpg" },
          { name: "Scanned Text", url: "/assets/images/monastery2.jpg" },
        ],
        audio: [{ lang: "English", file: "/assets/audio/pemayangtse-english.mp3" }],
        video: null,
        approved: false,
      },
      {
        _id: "m2",
        type: "monks",
        title: "Festival Rituals Documentation",
        submittedBy: "Lama Dorje",
        content:
          "Documentation of annual rituals performed at Tashiding Monastery during the Bumchu festival.",
        files: [{ name: "Ritual Notes", url: "/assets/docs/bhumchu_notes.pdf" }],
        audio: [{ lang: "English", file: "/assets/audio/pemayangtse-hindi.mp3" }],
        video: "/assets/video/sample1.mp4",
        approved: false,
      },
    ],
    locals: [
      {
        _id: "l1",
        type: "locals",
        title: "Oral History of Rumtek",
        submittedBy: "Karma Sherpa",
        content:
          "Stories passed down by elders about the reconstruction of Rumtek Monastery in the 20th century.",
        files: [{ name: "Interview Transcript", url: "/assets/docs/rumtek_story.pdf" }],
        audio: [{ lang: "English", file: "/assets/audio/sample1.mp3" }],
        video: null,
        approved: false,
      },
      {
        _id: "l2",
        type: "locals",
        title: "Traditional Songs of Sikkim",
        submittedBy: "Pema Lhamu",
        content:
          "Recording of local folk songs sung during monastery festivals in West Sikkim.",
        files: [],
        audio: [{ lang: "English", file: "/assets/audio/pemayangtse-english.mp3" }],
        video: null,
        approved: false,
      },
    ],
    researchers: [
      {
        _id: "r1",
        type: "researchers",
        title: "Architectural Study of Sikkim Monasteries",
        submittedBy: "Dr. Arjun Mehta",
        content:
          "A comparative study of 17th-century monasteries focusing on their mural art and symbolism.",
        files: [{ name: "Research Paper", url: "/assets/docs/bhumchu_notes.pdf" }],
        audio: [],
        video: "/assets/video/sample3.mp4",
        approved: false,
      },
      {
        _id: "r2",
        type: "researchers",
        title: "Digitization Techniques",
        submittedBy: "Dr. Sonam Bhutia",
        content:
          "Recommendations for high-resolution scanning and AI-based text recognition for palm-leaf manuscripts.",
        files: [],
        audio: [],
        video: null,
        approved: false,
      },
    ],
  });

  // Approve functions (local state only)
  const handleApproveMonastery = (id) => {
    setMonasteries((prev) =>
      prev.map((m) => (m._id === id ? { ...m, approved: true } : m))
    );
  };

  const handleApproveContribution = (id, type) => {
    setContributions((prev) => ({
      ...prev,
      [type]: prev[type].map((c) => (c._id === id ? { ...c, approved: true } : c)),
    }));
  };

  const handleRejectContribution = (id, type) => {
    setContributions((prev) => ({
      ...prev,
      [type]: prev[type].filter((c) => c._id !== id),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="sticky top-0 z-50 bg-gradient-to-b from-orange-50 to-amber-50 shadow-md">
        <Navbar />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-orange-900 text-center my-12 drop-shadow-md">
        Admin Dashboard
      </h1>

      {/* Monasteries Section */}
      <section className="mb-16 px-4 md:px-8">
        <h2 className="text-2xl font-semibold text-orange-800 mb-6">Monasteries</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {monasteries.map((m) => (
            <div
              key={m._id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition overflow-hidden border border-orange-100 hover:-translate-y-1 hover:scale-105 duration-300"
            >
              {m.thumbnail && (
                <img
                  src={m.thumbnail}
                  alt={m.name}
                  className="w-full h-56 object-cover transition-transform duration-300"
                />
              )}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-orange-900">{m.name}</h3>
                <p className="text-gray-700 line-clamp-3">{m.description}</p>
                <p className="text-gray-500 text-sm">
                  Location: {m.location.lat}, {m.location.lng}
                </p>

                {m.audio?.length > 0 &&
                  m.audio.map((a, idx) => (
                    <div key={idx} className="mt-2">
                      <p className="font-semibold">{a.lang}</p>
                      <audio controls className="w-full rounded-lg">
                        <source src={a.file} type="audio/mpeg" />
                      </audio>
                    </div>
                  ))}

                {m.manuscripts?.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {m.manuscripts.map((img, i) => (
                      <img key={i} src={img} alt={`manuscript-${i}`} className="w-full h-32 object-cover rounded" />
                    ))}
                  </div>
                )}

                {!m.approved ? (
                  <button
                    onClick={() => handleApproveMonastery(m._id)}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-2xl hover:bg-green-700 transition shadow"
                  >
                    Approve
                  </button>
                ) : (
                  <p className="text-green-700 font-semibold mt-3">✅ Approved</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contributions Section */}
      {["monks", "locals", "researchers"].map((type) => (
        <section key={type} className="mb-16 px-4 md:px-8">
          <h2 className="text-3xl font-bold text-orange-800 mb-6 capitalize">{type} Contributions</h2>
          {contributions[type]?.length === 0 ? (
            <p className="text-gray-600 italic text-center">No pending {type} contributions.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {contributions[type].map((c) => (
                <div
                  key={c._id}
                  className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition border border-orange-100 hover:-translate-y-1 hover:scale-105 duration-300"
                >
                  <h3 className="text-xl font-semibold text-orange-700">{c.title}</h3>
                  <p className="text-gray-700 mt-1">Submitted By: {c.submittedBy}</p>
                  {c.content && <p className="text-gray-600 mt-2 whitespace-pre-line">{c.content}</p>}

                  {c.files?.length > 0 &&
                    c.files.map((f, idx) => (
                      <a
                        key={idx}
                        href={f.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline block truncate"
                      >
                        📄 {f.name}
                      </a>
                    ))}

                  {c.audio?.length > 0 &&
                    c.audio.map((a, idx) => (
                      <div key={idx} className="mt-2">
                        <p className="font-medium">{a.lang}</p>
                        <audio controls className="w-full rounded-lg">
                          <source src={a.file} type="audio/mpeg" />
                        </audio>
                      </div>
                    ))}

                  {c.video && (
                    <div className="mt-2">
                      <p className="font-semibold text-orange-800">Video:</p>
                      <video controls className="w-full mt-2 rounded-2xl shadow">
                        <source src={c.video} type="video/mp4" />
                      </video>
                    </div>
                  )}

                  <div className="flex gap-3 mt-4">
                    {!c.approved ? (
                      <>
                        <button
                          onClick={() => handleApproveContribution(c._id, type)}
                          className="bg-green-600 text-white px-5 py-2 rounded-2xl hover:bg-green-700 transition shadow"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectContribution(c._id, type)}
                          className="bg-red-600 text-white px-5 py-2 rounded-2xl hover:bg-red-700 transition shadow"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <p className="text-green-700 font-semibold mt-2">✅ Approved</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      <footer className="bg-orange-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg border-2 border-amber-200 mx-auto mb-4 transition-transform hover:scale-105">
            <div className="text-orange-800 font-bold text-2xl">སྐུ</div>
          </div>
          <h5 className="text-2xl font-bold mb-2">KoraView</h5>
          <p className="text-amber-200 mb-6">སྐུ་ལུང་བལ་གཡུལ། - Preserving the Sacred Heritage of Sikkim</p>
          <div className="border-t border-orange-700 pt-6">
            <p className="text-amber-300 text-sm">
              བཀྲ་ཤིས་བདེ་ལེགས། - May all beings be blessed with happiness and prosperity
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
