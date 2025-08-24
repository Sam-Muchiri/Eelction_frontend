import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // to get id from URL

const Constituency = () => {
  const { id } = useParams(); // get the constituency id from URL
  const [constituency, setConstituency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/constituencies/${id}/`)
      .then((res) => {
        setConstituency(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load constituency data.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;
  if (!constituency) return null;

  return (
    <div className="bg-gradient-to-b from-green-50 via-green-100 to-green-50 min-h-screen font-sans">
  <header className="bg-green-700 text-white p-8 text-center relative overflow-hidden shadow-lg">
    {/* Animated or glowing shapes */}
    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-spin-slow"></div>

    <h1 className="text-4xl md:text-5xl font-extrabold mb-2">{constituency.name} Constituency</h1>
    <p className="text-lg md:text-xl">{constituency.county_name}</p>
  </header>

  <main className="max-w-6xl mx-auto p-6 space-y-10">
    {/* Symbol */}
    {constituency.symbol && (
      <div className="flex justify-center">
        <img
          src={constituency.symbol}
          alt={`${constituency.name} symbol`}
          className="w-36 h-36 object-contain rounded-xl shadow-lg border-2 border-green-300"
        />
      </div>
    )}

    {/* Stats Cards */}
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition">
        <span className="text-4xl mb-2 text-green-700">👤</span>
        <h3 className="font-semibold text-lg">Current MP</h3>
        <p className="text-gray-700 mt-1">{constituency.current_mp}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition">
        <span className="text-4xl mb-2 text-green-700">🏛️</span>
        <h3 className="font-semibold text-lg">Number of Wards</h3>
        <p className="text-gray-700 mt-1">{constituency.number_of_wards}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition">
        <span className="text-4xl mb-2 text-green-700">🗳️</span>
        <h3 className="font-semibold text-lg">Voter Turnout</h3>
        <p className="text-gray-700 mt-1">{constituency.voter_turnout}%</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition">
        <span className="text-4xl mb-2 text-green-700">🌍</span>
        <h3 className="font-semibold text-lg">Population</h3>
        <p className="text-gray-700 mt-1">{constituency.population}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition">
        <span className="text-4xl mb-2 text-green-700">📏</span>
        <h3 className="font-semibold text-lg">Area (km²)</h3>
        <p className="text-gray-700 mt-1">{constituency.area_km2}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition">
        <span className="text-4xl mb-2 text-green-700">📊</span>
        <h3 className="font-semibold text-lg">Development Index</h3>
        <p className="text-gray-700 mt-1">{constituency.development_index}/100</p>
      </div>
    </section>

    {/* Description */}
    {constituency.description && (
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">About {constituency.name}</h2>
        <p className="text-gray-700 leading-relaxed">{constituency.description}</p>
      </section>
    )}
  </main>
    </div>

  );
};

export default Constituency;
