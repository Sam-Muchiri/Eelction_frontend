import React from "react";
import CandidateCard from "./CandidateCard";

function CandidateList({ candidates, partyName, countyName, constituencyName, mediaURL }) {
  if (!candidates?.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {candidates.map((c) => (
        <CandidateCard
          key={c.id}
          candidate={c}
          partyName={partyName}
          countyName={countyName}
          constituencyName={constituencyName}
          mediaURL={mediaURL}
        />
      ))}
    </div>
  );
}

export default React.memo(CandidateList);
