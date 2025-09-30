import { useState } from "react";

export default function AudioPlayer({ audio }) {
  const [lang, setLang] = useState("english");
  return (
    <div>
      <div className="flex space-x-2 mb-2">
        <button
          onClick={() => setLang("english")}
          className={`px-3 py-1 rounded ${lang === "english" ? "bg-indigo-700 text-white" : "bg-gray-300"}`}
        >
          English
        </button>
        <button
          onClick={() => setLang("nepali")}
          className={`px-3 py-1 rounded ${lang === "nepali" ? "bg-indigo-700 text-white" : "bg-gray-300"}`}
        >
          Nepali
        </button>
      </div>
      <audio controls src={audio[lang]} className="w-full" />
    </div>
  );
}
