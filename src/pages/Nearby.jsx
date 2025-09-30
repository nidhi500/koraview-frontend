// src/pages/Nearby.jsx
import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from "react-leaflet";
import L from "leaflet";
import Navbar from "../components/Navbar";
import "leaflet/dist/leaflet.css";

// Default marker icon fix for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/assets/images/marker-icon-2x.png",
  iconUrl: "/assets/images/marker-icon.png",
  shadowUrl: "/assets/images/marker-shadow.png",
});

// Sample monasteries + tourist spots
const monasteries = [
  { name: "Pemayangtse Monastery", position: [27.3275, 88.6108], type: "मठ / Monastery" },
  { name: "Rumtek Monastery", position: [27.3300, 88.5610], type: "मठ / Monastery" },
  { name: "Tashiding Monastery", position: [27.3110, 88.4790], type: "मठ / Monastery" },
];

const touristSpots = [
  { name: "Khecheopalri Lake", position: [27.3433, 88.3167], type: "पर्यटक स्थल / Tourist Spot" },
  { name: "Nathula Pass", position: [27.3607, 88.9557], type: "पर्यटक स्थल / Tourist Spot" },
];

const Nearby = ({ user, onLogout }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [routeCoords, setRouteCoords] = useState([]);
  const [directions, setDirections] = useState([]);
  const [error, setError] = useState("");
  const mapRef = useRef(null);

  const handleRoute = async () => {
    setError("");
    setRouteCoords([]);
    setDirections([]);

    if (!source || !destination) {
      setError("कृपया स्रोत र गन्तव्य दुवै चयन गर्नुहोस्। / Please select both source and destination.");
      return;
    }

    const src = [...monasteries, ...touristSpots].find((l) => l.name === source);
    const dest = [...monasteries, ...touristSpots].find((l) => l.name === destination);

    if (!src || !dest) {
      setError("अमान्य स्रोत वा गन्तव्य। / Invalid source or destination.");
      return;
    }

    try {
      const apiKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjZmYmU4ZmQwOTU1YTRiZmVhNGM3ZDJlOTAxNGI0MTYzIiwiaCI6Im11cm11cjY0In0=";
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${src.position[1]},${src.position[0]}&end=${dest.position[1]},${dest.position[0]}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();
      const coords = data.features[0].geometry.coordinates.map((c) => [c[1], c[0]]);
      setRouteCoords(coords);

      if (coords.length > 0 && mapRef.current) {
        mapRef.current.fitBounds(coords, { padding: [50, 50] });
      }

      const steps = data.features[0].properties.segments[0].steps.map(
        (s, i) => `${i + 1}. ${s.instruction}`
      );
      setDirections(steps);
    } catch (err) {
      console.error(err);
      setError("मार्ग फेला पार्न सकिएन। API कुञ्जी र नेटवर्क जाँच गर्नुहोस्। / Could not fetch route. Check API key & network.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navbar */}
      <Navbar user={user} onLogout={onLogout} />

      <div className="flex flex-col md:flex-row mt-24 gap-6 px-4 md:px-8">
        {/* Map */}
        <div className="md:w-2/3 w-full rounded-2xl overflow-hidden shadow-lg border border-orange-100">
          <MapContainer
            center={[27.33, 88.62]}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: "80vh", width: "100%" }}
            ref={mapRef}
            maxBounds={[
              [26.5, 87.8],
              [28.1, 89.5],
            ]}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {[...monasteries, ...touristSpots].map((loc, i) => (
              <Marker key={i} position={loc.position}>
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                  <div className="bg-white shadow-md p-2 rounded-md text-sm text-orange-700 font-medium">
                    {loc.name} <span className="text-indigo-600 font-normal">{loc.type}</span>
                  </div>
                </Tooltip>
              </Marker>
            ))}

            {routeCoords.length > 0 && <Polyline positions={routeCoords} color="blue" weight={5} />}
          </MapContainer>
        </div>

        {/* Side Panel */}
        <div className="md:w-1/3 w-full bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-orange-100 h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-orange-800 mb-6">तपाईंको यात्रा योजना गर्नुहोस् / Plan Your Trip</h2>

          <label className="block mb-2 text-orange-700 font-semibold">स्रोत (Source)</label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full border border-orange-300 rounded-lg px-3 py-2 mb-4 shadow-sm focus:ring-2 focus:ring-orange-200 transition"
          >
            <option value="">-- स्रोत चयन गर्नुहोस् / Select Source --</option>
            {[...monasteries, ...touristSpots].map((loc, i) => (
              <option key={i} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>

          <label className="block mb-2 text-orange-700 font-semibold">गन्तव्य (Destination)</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full border border-orange-300 rounded-lg px-3 py-2 mb-4 shadow-sm focus:ring-2 focus:ring-orange-200 transition"
          >
            <option value="">-- गन्तव्य चयन गर्नुहोस् / Select Destination --</option>
            {[...monasteries, ...touristSpots].map((loc, i) => (
              <option key={i} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleRoute}
            className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-2 rounded-lg mb-4 shadow-md transition"
          >
            मार्ग देखाउनुहोस् / Show Route
          </button>

          {error && <div className="text-red-600 font-medium mb-4">{error}</div>}

          {directions.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2 text-orange-700">निर्देशनहरू / Directions:</h3>
              <ul className="list-decimal list-inside space-y-1 text-gray-700">
                {directions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nearby;
