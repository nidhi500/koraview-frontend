import React, { useState } from "react";

function MonasteryModal({ monastery, onClose }) {
  const [language, setLanguage] = useState("english");

  if (!monastery) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative p-6">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl font-bold transition-transform hover:scale-110"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-indigo-800">
          {monastery.name}
        </h2>

        {/* 360° Panorama */}
        <div className="w-full h-80 md:h-96 mb-6 rounded-xl overflow-hidden shadow-inner border border-gray-200">
          <img src={monastery.tour360} alt={monastery.name} className="w-full h-80 object-cover rounded-xl" />

        </div>

        {/* Audio Player */}
        <div className="mb-6">
          <div className="flex justify-center items-center gap-4 mb-3">
            {["english", "nepali"].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  language === lang
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-300/50"
                    : "bg-gray-200 text-gray-700 hover:bg-indigo-100"
                }`}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
          <audio controls className="w-full rounded-lg shadow-inner">
            <source src={monastery.audio[language]} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>

        {/* Archives */}
        {monastery.archives && monastery.archives.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-indigo-700 text-center">
              Digital Archives
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {monastery.archives.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <p className="text-center p-3 font-medium text-gray-800">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MonasteryModal;
