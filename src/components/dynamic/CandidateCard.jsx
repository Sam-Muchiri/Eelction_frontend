import React, { memo } from "react";

function CandidateCard({ candidate, partyName, countyName, constituencyName, mediaURL }) {
  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      {/* Incumbent Badge */}
      {candidate.is_incumbent && (
        <div className="absolute top-4 right-[-60px] rotate-45 bg-blue-600 text-white text-xs font-semibold px-16 py-1 shadow-md">
          current
        </div>
      )}

      {/* Photo */}
      {candidate.photo ? (
        <img
          src={mediaURL(candidate.photo)}
          alt={candidate.name}
          loading="lazy"
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="bg-blue-100 h-48 flex items-center justify-center text-3xl font-bold text-blue-700">
          {String(candidate.name || "?").slice(0, 1)}
        </div>
      )}

      {/* Info */}
      <div className="p-4 space-y-1">
        <h4 className="text-lg font-semibold">{candidate.name}</h4>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Party:</span> {partyName(candidate.party)}
        </p>
        {candidate.county && (
          <p className="text-sm text-gray-600">County: {countyName(candidate.county)}</p>
        )}
        {candidate.constituency && (
          <p className="text-sm text-gray-600">
            Constituency: {constituencyName(candidate.constituency)}
          </p>
        )}
      </div>

      {/* CTA */}
      <a
        href={`/candidateprof/${candidate.id}`}
        className="block text-center bg-blue-600 text-white py-2 text-sm font-semibold hover:bg-blue-700 transition"
      >
        View Profile
      </a>
    </div>
  );
}

export default memo(CandidateCard);
