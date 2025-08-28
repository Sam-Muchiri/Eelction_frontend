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

  // Function to render progress bar
  const ProgressBar = ({ label, value, color }) => {
  const gradient = {
    green: 'from-green-400 to-green-600',
    blue: 'from-blue-400 to-blue-600',
    purple: 'from-purple-400 to-purple-600',
    orange: 'from-orange-400 to-orange-600',
    red: 'from-red-400 to-red-600',
  };

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-gray-600 font-semibold">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
        <div
          className={`h-5 rounded-full bg-gradient-to-r ${gradient[color]} transition-all duration-700`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

  return (
    <div className="max-w-5xl mx-auto p-6 mt-5 space-y-8">
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex justify-center md:justify-start">
          <img
            src={candidate.photo || '/placeholder.png'}
            alt={candidate.name}
            className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg border-4 border-gray-100"
          />
        </div>

        <div className="md:col-span-2 flex flex-col justify-center space-y-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">{candidate.name || "N/A"}</h2>
          </div>

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

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Position</h3>
            <p className="text-gray-500 capitalize">{candidate.position || "N/A"}</p>
          </div>

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
      {/* Ratings Section */}
      <div id='rating' className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto mt-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Candidate Ratings
        </h2>

        {candidate.score && (
          <>
            <ProgressBar label="Track Record" value={candidate.score.track_record} color="green" />
            <ProgressBar label="Education & Experience" value={candidate.score.education_experience} color="blue" />
            <ProgressBar label="Manifesto Relevance" value={candidate.score.manifesto_relevance} color="purple" />
            <ProgressBar label="Integrity" value={candidate.score.integrity} color="orange" />
            <ProgressBar label="Corruption Cases" value={candidate.score.corruption_cases || 0} color="red" />
          </>
        )}
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
        <div id='manifesto' className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Manifesto</h2>
          <p className="text-gray-700 leading-relaxed">{candidate.manifesto}</p>
        </div>
      )}

      {/* Achievements Section */}
      {candidate.achievements && (
        <div id='achievements' className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Achievements</h2>
          <p className="text-gray-700 leading-relaxed">{candidate.achievements}</p>
        </div>
      )}

      {/* Rating Section */}
      {/* Evidence Section */}
      {candidate.evidences && candidate.evidences.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Evidences</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {candidate.evidences.map((ev, index) => (
              <li key={index}>
                <span className="font-semibold">{ev.title}</span>: {ev.description || "N/A"} 
                {ev.link && <a href={ev.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 ml-1 hover:underline">[Link]</a>}
              </li>
            ))}
          </ul>
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
