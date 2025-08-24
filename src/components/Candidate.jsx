import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CandidateProfile() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/candidate/${id}/`)
      .then(res => setCandidate(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!candidate) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-5 space-y-8">
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Candidate Photo */}
        <div className="flex justify-center md:justify-start">
          <img
            src={candidate.photo || '/placeholder.png'}
            alt={candidate.name}
            className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg border-4 border-gray-100"
          />
        </div>

        {/* Candidate Details */}
        <div className="md:col-span-2 flex flex-col justify-center space-y-4">
          {/* Name */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Candidate Name</h2>
            <p className="text-gray-500 mt-1 text-lg">{candidate.name || "N/A"}</p>
          </div>

          {/* Party */}
          {candidate.party && (
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Party</h3>
                <p className="text-gray-500">{candidate.party.name || "N/A"}</p>
              </div>
              {candidate.party.symbol && (
                <img
                  src={candidate.party.symbol}
                  alt={candidate.party.name}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-md"
                />
              )}
            </div>
          )}

          {/* Position */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Position</h3>
            <p className="text-gray-500 capitalize">{candidate.position || "N/A"}</p>
          </div>

          {/* County & Constituency */}
          <div className="grid grid-cols-2 gap-6 mt-2">
            {candidate.county &&
            <div>
              <h3 className="text-lg font-semibold text-gray-700">County</h3>
              <p className="text-gray-500">{candidate.county?.name || "N/A"}</p>
            </div>}
            {candidate.constituency &&
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Constituency</h3>
              <p className="text-gray-500">{candidate.constituency?.name || "N/A"}</p>
            </div>}
          </div>
        </div>
      </div>


      {/* Bio Section */}
      {candidate.bio && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Biography</h2>
          <p className="text-gray-700 leading-relaxed">{candidate.bio}</p>
        </div>
      )}

      {/* Manifesto Section */}
      {candidate.manifesto && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Manifesto</h2>
          <p className="text-gray-700 leading-relaxed">{candidate.manifesto}</p>
        </div>
      )}

      {/* Achievements Section */}
      {candidate.achievements && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Achievements</h2>
          <p className="text-gray-700 leading-relaxed">{candidate.achievements}</p>
        </div>
      )}

      {/* Back Button */}
      <div className="text-center">
        <Link
          to="/#candidates"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
        >
          Back to Candidates
        </Link>
      </div>

    </div>
  );
}
