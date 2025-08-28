import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom"; // to get id from URL
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Constituency = () => {
  const { id } = useParams(); // get the constituency id from URL
  const [constituency, setConstituency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mps, setMps] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/constituencies/${id}/`);
        setConstituency(res.data);

        const mpRes = await axios.get(`http://127.0.0.1:8000/api/constituencies/${id}/candidates/mp/`);
        setMps(mpRes.data);
        // Prepare chart data
        const labels = mpRes.data.map((g) => g.name);
        const scores = mpRes.data.map((g) => g.score || 0); // make sure backend provides this
        setChartData({
          labels,
          datasets: [
            {
              label: "Score (%)",
              data: scores,
              backgroundColor: [
                "#60a5fa",
                "#f87171",
                "#34d399",
                "#facc15",
                "#c084fc",
              ],
              borderColor: "#fff",
              borderWidth: 2,
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load constituency data.");
        setLoading(false);
      }
    };
    fetchData();
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
        <section id="ranking" className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Mps Rankings</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mps.map((g, idx) => (
              <div key={g.id} className="bg-purple-50 rounded-lg p-4 shadow hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Rank #{idx + 1}
                  </span>
                  <span className="text-green-600 font-bold text-lg">{g.score || 0}%</span>
                </div>
                <h3 className="font-semibold text-purple-700">{g.name}</h3>
                <p className="text-sm text-gray-600">Party: {g.party}</p>
              </div>
            ))}
          </div>
        </section>
        
        
        {chartData && (
          <section className="max-w-3xl mx-auto mt-10 mb-6 px-4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Mps Candidate Score Distribution
              </h2>
              <div className="relative w-full h-64 sm:h-72 md:h-80">
                <Pie
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "bottom", labels: { font: { size: 14 }, color: "#4b5563" } },
                      tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}%` } }
                    }
                  }}
                />
              </div>
            </div>
          </section>
        )}
        {/* Description */}
        {constituency.description && (
          <section className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">About {constituency.name}</h2>
            <p className="text-gray-700 leading-relaxed">{constituency.description}</p>
          </section>
        )}

        {/* Back Navigation */}
        <div className="text-center mt-8">
          <Link to={`/county/${constituency.county}`} className="inline-block px-6 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition">
            ← Back to county
          </Link>
        </div>
      </main>
    </div>

  );
};

export default Constituency;
