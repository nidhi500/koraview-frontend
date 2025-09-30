// src/components/ContributionForm.jsx
import { useState } from "react";
import { submitContribution } from "../api/contributionAPI";
import { User, BookOpen, MapPin } from "lucide-react";

export default function ContributionForm({ type }) {
  const [form, setForm] = useState({ title: "", description: "", submittedBy: "" });
  const [message, setMessage] = useState("");

  const icons = {
    monk: <BookOpen className="text-purple-600 w-6 h-6" />,
    local: <MapPin className="text-green-600 w-6 h-6" />,
    researcher: <User className="text-blue-600 w-6 h-6" />,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContribution({ ...form, type });
      setMessage("✅ Contribution submitted! Pending admin approval.");
      setForm({ title: "", description: "", submittedBy: "" });
    } catch (err) {
      setMessage("❌ Error submitting. Try again.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
      <div className="flex items-center mb-4 space-x-2">
        {icons[type]}
        <h2 className="text-xl font-bold capitalize">{type} Contribution</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={form.submittedBy}
          onChange={(e) => setForm({ ...form, submittedBy: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          placeholder="Title of Contribution"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          placeholder="Describe your contribution..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows="4"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
