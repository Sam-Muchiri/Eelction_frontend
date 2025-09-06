import React from "react";
import CandidateList from "./CandidateList";

function CandidateSection({ title, candidates, partyName, countyName, constituencyName, mediaURL }) {
  if (!candidates?.length) return null;

  return (
    <section className="mb-16">
      <h3 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 border-b-4 border-blue-200 pb-2">
        {title}
      </h3>

      <CandidateList
        candidates={candidates}
        partyName={partyName}
        countyName={countyName}
        constituencyName={constituencyName}
        mediaURL={mediaURL}
      />
    </section>
  );
}

export default React.memo(CandidateSection);
