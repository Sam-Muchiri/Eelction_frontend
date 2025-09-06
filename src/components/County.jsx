import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CountyDetail = () => {
  const { id } = useParams();
  const [county, setCounty] = useState(null);
  const [constituencies, setConstituencies] = useState([]);
  const [governors, setGovernors] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountyData = async () => {
      try {
        const countyRes = await axios.get(`http://localhost:8000/api/counties/${id}/`);
        setCounty(countyRes.data);

        const constituenciesRes = await axios.get(`http://localhost:8000/api/counties/${id}/constituencies/`);
        setConstituencies(constituenciesRes.data);

        const governorsRes = await axios.get(`http://localhost:8000/api/counties/${id}/candidates/governor`);
        setGovernors(governorsRes.data);

        // Prepare chart data
        const labels = governorsRes.data.map((g) => g.name);
        const scores = governorsRes.data.map((g) => g.score || 0); // make sure backend provides this
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
      } catch (error) {
        console.error("Error fetching county data:", error);
        setLoading(false);
      }
    };

    fetchCountyData();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading county details...</p>;
  if (!county) return <p className="text-center mt-20 text-red-600">County not found.</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-700 via-green-600 to-purple-500 text-white py-24">
        {/* Decorative Background Symbol */}
        {county.symbol && (
          <img
            src={county.symbol}
            alt={`${county.name} symbol`}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 w-96 h-96 object-contain"
          />
        )}

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            {county.name} County
          </h1>
          <p className="text-lg md:text-2xl text-gray-100 font-light leading-relaxed">
            {county.description?.split(" ").slice(0, 30).join(" ")}...
          </p>

          {/* Optional CTA button */}
          <a
            href="#overview"
            className="mt-8 inline-block bg-white text-purple-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Learn More
          </a>
        </div>
      </section>


      {/* Overview */}
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-16">
        <section id="overview" className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* County Symbol */}
            {county.symbol && (
              <div className="flex-shrink-0">
                <img
                  src={county.symbol}
                  alt={`${county.name} symbol`}
                  className="w-64 h-64 md:w-72 md:h-72 object-contain rounded-2xl border-4 border-purple-200 shadow-lg"
                />
              </div>
            )}

            {/* County Info */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900 mb-4">County Overview</h2>
              
              <ul className="text-md md:text-lg text-gray-800 space-y-2">
                <li><span className="font-semibold text-purple-700">County Code:</span> 0{county.code}</li>
                <li><span className="font-semibold text-purple-700">Headquarters:</span> {county.capital}</li>
                <li><span className="font-semibold text-purple-700">Population:</span> {county.population.toLocaleString()}</li>
                <li><span className="font-semibold text-purple-700">Area:</span> {county.area_km2.toLocaleString()} km²</li>
                <li><span className="font-semibold text-purple-700">Constituencies:</span> {county.total_constituencies}</li>
              </ul>
              
              <p className="mt-6 text-gray-600 text-md md:text-lg leading-relaxed">{county.description}</p>
            </div>

          </div>
        </section>

        <section id="ranking" className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Governor Rankings</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {governors.map((g, idx) => (
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
            <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Governor Candidate Score Distribution
              </h2>
              <div className="relative w-full h-64 sm:h-72 md:h-80">
                <Pie
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "right",align: "center", labels: { font: { size: 14 }, boxWidth: 20,
                      color: "#4b5563" } },
                      tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}%` } }
                    }
                  }}
                />
              </div>
            </section>
        )}
        {/* Constituencies Section */}
        <section id="constituencies" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-10 text-center">
              Constituencies in {county.name}
            </h2>

            {constituencies.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {constituencies.map((c) => (
                  <div
                    key={c.id}
                    className="relative block bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition p-6 overflow-hidden flex flex-col justify-between"
                  >
                    {/* Decorative Circle with Party Logo or First Letter */}
                    <div className="absolute -top-6 right-6 w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                      {c.party_logo ? (
                        <img src={c.party_logo} alt="Party Logo" className="w-10 h-10 object-contain rounded-full" />
                      ) : (
                        <span className="text-purple-700 font-bold">{c.name[0]}</span>
                      )}
                    </div>

                    {/* Constituency Name */}
                    <h3 className="text-xl font-semibold text-purple-700 mt-6">{c.name}</h3>

                    {/* Current MP */}
                    <div className="flex items-center mt-3 text-gray-600 text-sm space-x-2">
                      <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 18a8 8 0 0116 0H2z" />
                      </svg>
                      <span><strong>MP:</strong> {c.current_mp}</span>
                    </div>

                    {/* Cool substituted elements */}
                    <div className="flex flex-col mt-3 space-y-1 text-gray-600 text-sm">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2L2 8l8 6 8-6-8-6z" />
                        </svg>
                        <span><strong>Wards:</strong> {c.number_of_wards}</span>
                      </div>
                      {/* Example: Key Landmark */}
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2L2 8l8 6 8-6-8-6z" />
                        </svg>
                        <span><strong>Landmark:</strong> {c.area_km2 || 'N/A'}km²</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link
                      to={`/county/${county.id}/constituencies/${c.id}`}
                      className="mt-6 inline-block text-center bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl hover:bg-purple-800 transition"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 text-lg">No constituencies available yet.</p>
            )}
          </div>
        </section>


        {/* Back Navigation */}
        <div className="text-center mt-8">
          <Link to="/counties" className="inline-block px-6 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition">
            ← Back to Counties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CountyDetail;
