// src/components/MonasteryCard.jsx
import React, { useState } from "react";
import { Book, Volume2, MapPin } from "lucide-react";

export default function MonasteryCard({ monastery }) {
  const [tab, setTab] = useState("history"); // local state
  const [viewing, setViewing] = useState("inside"); // inside/outside panorama toggle

  return (
    <article className="rounded-2xl shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm border border-amber-200/50 transition-all hover:shadow-lg hover:-translate-y-0.5">
      {/* 360 Viewer */}
      <div className="w-full h-64 md:h-72 relative bg-gray-900/5">
        {/* Panorama toggle */}
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          {["inside", "outside"].map((v) => (
            <button
              key={v}
              onClick={() => setViewing(v)}
              className={`text-sm px-3 py-1 rounded-full font-medium shadow ${
                viewing === v
                  ? "bg-orange-700 text-white"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
            >
              {v === "inside" ? "भित्र - Inside" : "बाहिर - Outside"}
            </button>
          ))}
        </div>

        {monastery.panoramas && monastery.panoramas[viewing] ? (
          <iframe
            title={`${monastery.name} 360 ${viewing}`}
            src={monastery.panoramas[viewing]}
            className="w-full h-full border-0"
            allowFullScreen
          />
        ) : (
          <img
            src={monastery.thumbnail}
            alt={`${monastery.name} ${viewing}`}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4 text-orange-700">
          <MapPin className="w-5 h-5" />
          <span className="font-medium">
            {monastery.location?.lat}, {monastery.location?.lng}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-orange-800 mb-1">{monastery.name}</h3>
        <p className="text-amber-700 text-lg mb-3 italic">सांस्कृतिक स्थल - Cultural Site</p>

        {/* Tabs */}
        <div className="space-y-3">
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setTab("history")}
              className={`flex-1 text-left px-4 py-2 rounded-xl font-medium transition-colors ${
                tab === "history"
                  ? "bg-orange-50/80 text-orange-800"
                  : "bg-white/60 text-gray-700 hover:bg-orange-50/50"
              }`}
            >
              इतिहास - History
            </button>
            <button
              onClick={() => setTab("audio")}
              className={`flex-1 text-left px-4 py-2 rounded-xl font-medium transition-colors ${
                tab === "audio"
                  ? "bg-orange-50/80 text-orange-800"
                  : "bg-white/60 text-gray-700 hover:bg-orange-50/50"
              }`}
            >
              <Volume2 className="w-4 h-4 inline mr-1" /> आवाज - Audio
            </button>
            <button
              onClick={() => setTab("archives")}
              className={`flex-1 text-left px-4 py-2 rounded-xl font-medium transition-colors ${
                tab === "archives"
                  ? "bg-orange-50/80 text-orange-800"
                  : "bg-white/60 text-gray-700 hover:bg-orange-50/50"
              }`}
            >
              <Book className="w-4 h-4 inline mr-1" /> पाण्डुलिपि - Manuscripts
            </button>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-amber-200/50">
            {tab === "history" && <p className="text-gray-700">{monastery.description}</p>}

            {tab === "audio" && (
              <div className="space-y-3">
                {["english", "hindi", "nepali"].map((lang) => (
                  <div key={lang} className="flex items-center gap-3">
                    <div className="w-28 text-sm font-medium">
                      {lang === "english" ? "English" : lang === "hindi" ? "हिन्दी" : "नेपाली"}
                    </div>
                    <audio controls className="flex-1" src={monastery.audio?.[lang]} />
                  </div>
                ))}
              </div>
            )}

            {tab === "archives" && (
              <div className="grid grid-cols-2 gap-3">
                {(monastery.archives || []).map((a) => (
                  <div
                    key={a.id}
                    className="rounded-xl overflow-hidden border border-amber-200/50 shadow-sm"
                  >
                    <img src={a.image} alt={a.title} className="w-full h-28 object-cover" />
                    <div className="p-2 text-sm font-medium text-orange-800">{a.title}</div>
                  </div>
                ))}
                {(!monastery.archives || monastery.archives.length === 0) && (
                  <div className="text-gray-500">
                    कोई पाण्डुलिपि उपलब्ध नहीं है - No manuscripts available
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
