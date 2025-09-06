import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PresidentsPage = () => {
  const [presidents, setPresidents] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/candidates/presidents/")
      .then((res) => {
        setPresidents(res.data);
        console.log(res.data);
        // Prepare chart data
        const labels = res.data.map((c) => c.name);
      const scores = res.data.map((c) => Number(c.score?.score) || 0);

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
              "#f97316",
              "#0ea5e9",
              "#a78bfa",
            ],
            borderColor: "#fff",
            borderWidth: 2,
          },
        ],
      });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center p-6">
  <h1 className="text-3xl font-bold text-blue-700 mb-6">Presidential Candidates</h1>

    {/* Presidential Candidate Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
    {presidents.map((candidate) => (
      <div
        key={candidate.id}
        className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300 relative"
      >
        {/* Incumbent Banner */}
        {candidate.is_incumbent && (
          <div className="absolute top-0 left-0 w-full bg-yellow-400 text-white text-xs font-semibold text-center py-1 rounded-t-2xl">
            In Office
          </div>
        )}

        {/* Candidate Photo */}
        <img
          src={candidate.photo || "https://via.placeholder.com/150"}
          alt={candidate.name}
          className="w-24 h-24 object-cover rounded-full border-4 border-blue-400 mt-4"
        />

        {/* Candidate Name */}
        <h2 className="text-lg font-semibold text-gray-800 mt-3 text-center">
          {candidate.name}
        </h2>

        {/* Party */}
        <p className="text-sm text-gray-600">{candidate.party.name}</p>

        {/* View Details Button */}
        <Link
          to={`/candidateprof/${candidate.id}`}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    ))}
  </div>

  {/* Rankings Section */}
  <section className="bg-white rounded-2xl shadow-md p-6 mt-10 w-full max-w-6xl">
    <h2 className="text-2xl font-semibold text-purple-800 mb-4">
      Presidential Candidate Rankings
    </h2>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {presidents
        .sort((a, b) => (b.score?.score || 0) - (a.score?.score || 0))
        .map((c, idx) => (
          <div
            key={c.id}
            className="bg-purple-50 rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                Rank #{idx + 1}
              </span>
              <span className="text-green-600 font-bold text-lg">
                {c.score?.score || 0}%
              </span>
            </div>
            <h3 className="font-semibold text-purple-700">{c.name}</h3>
            <p className="text-sm text-gray-600">
              Party: {c.party?.name || "N/A"}
            </p>
          </div>
        ))}
    </div>
  </section>

  {/* Pie Chart Section */}
  {chartData && (
      <section className="bg-white rounded-2xl mt-10 shadow-lg border border-gray-200 p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
          Presidential Candidate Score Distribution
        </h2>
        <div className="relative w-full h-64 sm:h-72 md:h-80 flex justify-center">
          <Pie
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "right", // move labels to the right
                  align: "center",
                  labels: {
                    font: { size: 14 },
                    color: "#4b5563",
                    boxWidth: 20,
                    padding: 15, // spacing between labels
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.label}: ${context.raw}%`,
                  },
                },
              },
            }}
          />
        </div>
      </section>
  )}

</div>

  );
};

export default PresidentsPage;
