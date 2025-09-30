import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Monasteries = () => {
  const [monasteries, setMonasteries] = useState([]);

  useEffect(() => {
    const fetchMonasteries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/monasteries");
        setMonasteries(res.data);
      } catch (err) {
        console.error("Error fetching monasteries:", err);
      }
    };

    fetchMonasteries();
  }, []);

  if (!monasteries.length) {
    return <p className="text-center py-20 text-gray-500">No monasteries found.</p>;
  }

  return (
    <div className="py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Featured Monasteries of Sikkim
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {monasteries.map((monastery, index) => (
          <Card
            key={index}
            className="shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden"
          >
            {monastery.thumbnail && (
              <img
                src={monastery.thumbnail}
                alt={monastery.name}
                className="w-full h-56 object-cover"
              />
            )}
            <CardContent className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold text-indigo-700">
                {monastery.name}
              </h3>
              <p className="text-gray-600">{monastery.description}</p>

              {monastery.audio && (
                <div className="flex gap-2">
                  {monastery.audio.hindi && (
                    <Button
                      variant="outline"
                      onClick={() => new Audio(monastery.audio.hindi).play()}
                    >
                      🎧 Hindi
                    </Button>
                  )}
                  {monastery.audio.nepali && (
                    <Button
                      variant="outline"
                      onClick={() => new Audio(monastery.audio.nepali).play()}
                    >
                      🎧 Nepali
                    </Button>
                  )}
                </div>
              )}

              {monastery.archives?.length > 0 && (
                <div className="space-y-1">
                  <h4 className="font-semibold text-gray-700">Manuscripts & Archives:</h4>
                  {monastery.archives.map((file, idx) => (
                    <a
                      key={idx}
                      href={file}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline block"
                    >
                      {file.split("/").pop()}
                    </a>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Monasteries;
