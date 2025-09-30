// src/pages/FeaturedMonasteries.jsx
import React from "react";
import MONASTERIES from "../data/monasteries";
import MonasteryCard from "../components/MonasteryCard";

export default function FeaturedMonasteries() {
  // For now we use local data. Later replace with fetch to your API.
  const featured = MONASTERIES.slice(0, 3); // first 3

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">Featured Monasteries</h1>
        <p className="text-gray-600 mb-8">Explore inside & outside panoramas, listen to local narrations, and view manuscript scans.</p>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {featured.map(m => (
            <MonasteryCard key={m.id} monastery={m} />
          ))}
        </div>
      </div>
    </div>
  );
}
