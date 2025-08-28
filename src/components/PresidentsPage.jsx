import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PresidentsPage = () => {
  const [presidents, setPresidents] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/candidates/presidents/")
      .then((res) => setPresidents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Presidential Candidates</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {presidents.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={candidate.photo || "https://via.placeholder.com/150"}
              alt={candidate.name}
              className="w-24 h-24 object-cover rounded-full border-4 border-blue-300 mb-3"
            />
            <h2 className="text-xl font-semibold text-gray-800">{candidate.name}</h2>
            <p className="text-sm text-gray-600">{candidate.party.name}</p>

            <Link
              to={`/candidateprof/${candidate.id}`}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PresidentsPage;
