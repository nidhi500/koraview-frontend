// src/components/CommunityGallery.jsx
import { useEffect, useState } from "react";
import { getPublicContributions } from "../api/contributionAPI";
import { BookOpen, MapPin, User } from "lucide-react";

export default function CommunityGallery() {
  const [monks, setMonks] = useState([]);
  const [locals, setLocals] = useState([]);
  const [researchers, setResearchers] = useState([]);

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    setMonks(await getPublicContributions("monk"));
    setLocals(await getPublicContributions("local"));
    setResearchers(await getPublicContributions("researcher"));
  };

  const sections = [
    { title: "Monks’ Wisdom", data: monks, icon: <BookOpen className="w-6 h-6 text-purple-600" /> },
    { title: "Local Stories", data: locals, icon: <MapPin className="w-6 h-6 text-green-600" /> },
    { title: "Researchers’ Insights", data: researchers, icon: <User className="w-6 h-6 text-blue-600" /> },
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Community Contributions</h1>

      {sections.map(({ title, data, icon }) => (
        <section key={title} className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            {icon}
            <h2 className="text-2xl font-semibold">{title}</h2>
          </div>
          {data.length === 0 ? (
            <p className="text-gray-500 italic">No contributions yet.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {data.map((c) => (
                <div
                  key={c._id}
                  className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <h3 className="font-bold text-lg mb-2">{c.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{c.description}</p>
                  <p className="text-xs text-gray-400">By {c.submittedBy}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
