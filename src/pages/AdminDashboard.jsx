// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { getMonasteries, approveMonastery } from "../api/monasteryAPI";
import Navbar from "../components/Navbar";
import {
  getContributions,
  approveContribution,
  rejectContribution,
} from "../api/contributionAPI";

Modal.setAppElement("#root");

export default function AdminDashboard() {
  const [monasteries, setMonasteries] = useState([]);
  const [contributions, setContributions] = useState({
    monks: [],
    locals: [],
    researchers: [],
  });

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    fetchMonasteries();
    fetchContributions();
  }, []);

  const fetchMonasteries = async () => {
    try {
      const data = await getMonasteries();
      setMonasteries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch monasteries:", err);
      setMonasteries([]);
    }
  };

  const fetchContributions = async () => {
    try {
      const res = await getContributions(token);
      setContributions(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveMonastery = async (id) => {
    await approveMonastery(id, token);
    fetchMonasteries();
  };

  const handleApproveContribution = async (id, type) => {
    await approveContribution(id, type, token);
    setContributions((prev) => ({
      ...prev,
      [type]: prev[type].map((c) =>
        c._id === id ? { ...c, approved: true } : c
      ),
    }));
  };

  const handleRejectContribution = async (id, type) => {
    await rejectContribution(id, type, token);
    setContributions((prev) => ({
      ...prev,
      [type]: prev[type].filter((c) => c._id !== id),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 bg-gradient-to-b from-orange-50 to-amber-50 shadow-md">
        <Navbar />
      </div>

      {/* Centered Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-orange-900 text-center my-12 drop-shadow-md">
        Admin Dashboard
      </h1>

      {/* Monasteries Section */}
<section className="mb-16 px-4 md:px-8">
  <h2 className="text-2xl font-semibold text-orange-800 mb-6">
    Monasteries
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {monasteries.length === 0 && (
      <p className="text-gray-600 italic col-span-full text-center">
        No monasteries found in database.
      </p>
    )}
    {monasteries.map((m) => (
      <div
        key={m._id}
        className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition overflow-hidden border border-orange-100 hover:-translate-y-1 hover:scale-105 duration-300"
      >
        {/* Thumbnail */}
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

          {/* Audio Section (Fixed) */}
          {m.audio?.length > 0 && (
            <div className="mt-2 space-y-2">
              {m.audio.map((a, idx) => (
                <div key={idx}>
                  <p className="font-semibold">{a.lang}</p>
                  <audio controls className="w-full rounded-lg">
                    <source src={a.file} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
            </div>
          )}

          {/* Manuscripts */}
          {m.manuscripts?.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {m.manuscripts.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`manuscript-${i}`}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          )}

          {/* Approve Button */}
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
    <h2 className="text-3xl font-bold text-orange-800 mb-6 capitalize">
      {type} Contributions
    </h2>

    {contributions[type]?.length === 0 ? (
      <p className="text-gray-600 italic text-center">
        No pending {type} contributions.
      </p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {contributions[type].map((c) => (
          <div
            key={c._id}
            className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition border border-orange-100 hover:-translate-y-1 hover:scale-105 duration-300"
          >
            {/* Title & Submitter */}
            <h3 className="text-xl font-semibold text-orange-700">{c.title}</h3>
            <p className="text-gray-700 mt-1">Submitted By: {c.submittedBy}</p>

            {/* Content */}
            {c.content && (
              <p className="text-gray-600 mt-2 whitespace-pre-line">{c.content}</p>
            )}

            {/* Files / PDF / Images Preview */}
            {c.files?.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="font-semibold text-orange-800">Attached Files:</p>
                {c.files.map((f, idx) => {
                  const fileUrl = typeof f === "string" ? f : f.url;
                  const fileName =
                    typeof f === "string" ? `File ${idx + 1}` : f.name || `File ${idx + 1}`;
                  const ext = fileUrl.split(".").pop().toLowerCase();

                  if (ext === "pdf") {
                    return (
                      <div
                        key={idx}
                        className="border rounded-lg overflow-auto h-64"
                      >
                        <iframe
                          src={fileUrl}
                          title={fileName}
                          className="w-full h-full"
                        />
                      </div>
                    );
                  } else if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
                    return (
                      <img
                        key={idx}
                        src={fileUrl}
                        alt={fileName}
                        className="w-full h-auto max-h-64 object-contain rounded-lg"
                      />
                    );
                  } else {
                    return (
                      <a
                        key={idx}
                        href={fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline block truncate"
                        title={fileName}
                      >
                        📄 {fileName}
                      </a>
                    );
                  }
                })}
              </div>
            )}

            {/* Audio Section */}
            {c.audio?.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="font-semibold text-orange-800">Audio:</p>
                {c.audio.map((a, idx) => (
                  <div key={idx}>
                    <p className="font-medium">{a.lang}</p>
                    <audio controls className="w-full rounded-lg">
                      <source src={a.file} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ))}
              </div>
            )}

            {/* Video Section */}
            {c.video && (
              <div className="mt-3">
                <p className="font-semibold text-orange-800">Video:</p>
                <video controls className="w-full mt-2 rounded-2xl shadow">
                  <source src={c.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* Approve / Reject Buttons */}
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
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg border-2 border-amber-200 mx-auto mb-4 will-change-transform transition-transform hover:scale-105">
              <div className="text-orange-800 font-bold text-2xl">སྐུ</div>
            </div>
            <h5 className="text-2xl font-bold mb-2">KoraView</h5>
            <p className="text-amber-200 mb-6">
              སྐུ་ལུང་བལ་གཡུལ། - Preserving the Sacred Heritage of Sikkim
            </p>
            <div className="border-t border-orange-700 pt-6">
              <p className="text-amber-300 text-sm">
                བཀྲ་ཤིས་བདེ་ལེགས། - May all beings be blessed with happiness and prosperity
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
