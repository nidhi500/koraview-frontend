import { useState, useEffect } from "react";
import { getMonasteries, createMonastery } from "../api/monasteryAPI";

export default function ContributorDashboard() {
  const [monasteries, setMonasteries] = useState([]);
  const [form, setForm] = useState({ name: "", lat: "", lng: "" });
  const token = localStorage.getItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGI1ZmFiNDYzZTJhNTFhMzMwZjdlZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1OTIxMDMwOCwiZXhwIjoxNzU5ODE1MTA4fQ.u570R1QFin7PlekXZvLdECkssy0AyjsdQHpmLsJnYjA");

  useEffect(() => {
    fetchMonasteries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMonasteries = async () => {
    const res = await getMonasteries(token);
    setMonasteries(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMonastery({ ...form, approved: false }, token);
    setForm({ name: "", lat: "", lng: "" });
    fetchMonasteries();
  };

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Contributor Dashboard</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Add New Monastery</h2>
        <input
          type="text"
          placeholder="Name"
          className="input mb-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Latitude"
          className="input mb-3"
          value={form.lat}
          onChange={(e) => setForm({ ...form, lat: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Longitude"
          className="input mb-3"
          value={form.lng}
          onChange={(e) => setForm({ ...form, lng: e.target.value })}
          required
        />
        <button type="submit" className="btn w-full">Submit</button>
      </form>

      <h2 className="text-2xl font-bold mb-4 text-center">Your Monasteries</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {monasteries.map((m) => (
          <div key={m.id} className="border p-4 rounded shadow-md">
            <h3 className="font-semibold">{m.name}</h3>
            <p>Lat: {m.lat}, Lng: {m.lng}</p>
            <p>Approved: {m.approved ? "Yes" : "Pending"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
