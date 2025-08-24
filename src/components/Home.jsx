import { useEffect, useMemo, useState } from "react";
import { API, mediaURL } from "../api";
import { Search } from "lucide-react";

export default function Home() {
  // Countdown
  const [countdown, setCountdown] = useState("");
  // Data
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  const [counties, setCounties] = useState([]);
  const [constituencies, setConstituencies] = useState([]);
  const [error, setError] = useState("");

  // Filters
  const [q, setQ] = useState("");
  const [selectedParty, setSelectedParty] = useState("all");
  const [selectedPosition, setSelectedPosition] = useState("all");

  // Load data once
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [partiesRes, countiesRes, constRes, candRes] = await Promise.all([
          API.get("parties/"),
          API.get("counties/"),
          API.get("constituencies/"),
          API.get("candidates/"),
        ]);
        setParties(partiesRes.data);
        setCounties(countiesRes.data);
        setConstituencies(constRes.data);
        setCandidates(candRes.data);
      } catch (e) {
        console.error(e);
        setError("Failed to load data. Check API URL/CORS.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Countdown timer (2027 election example)
  useEffect(() => {
    const electionDate = new Date("2027-08-09T07:00:00").getTime();
    const i = setInterval(() => {
      const now = Date.now();
      const distance = electionDate - now;
      if (distance < 0) {
        clearInterval(i);
        setCountdown("Election Day is Here!");
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown(`${days}d ${hrs}h ${mins}m ${secs}s`);
    }, 1000);
    return () => clearInterval(i);
  }, []);

  // Build quick id->name maps (for when API returns IDs rather than nested)
  const partyName = (idOrObj) => {
    if (!idOrObj) return "";
    if (typeof idOrObj === "object") return idOrObj.name || idOrObj.abbreviation || "";
    const p = parties.find((p) => p.id === idOrObj);
    return p ? p.name : "";
  };
  const countyName = (idOrObj) => {
    if (!idOrObj) return "";
    if (typeof idOrObj === "object") return idOrObj.name || "";
    const c = counties.find((c) => c.id === idOrObj);
    return c ? c.name : "";
  };
  const constituencyName = (idOrObj) => {
    if (!idOrObj) return "";
    if (typeof idOrObj === "object") return idOrObj.name || "";
    const c = constituencies.find((c) => c.id === idOrObj);
    return c ? c.name : "";
  };

  // Filtered + grouped data
  const filtered = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    const partyId = selectedParty === "all" ? null : Number(selectedParty);
    const pos = selectedPosition === "all" ? null : selectedPosition;

    return candidates.filter((c) => {
      // name search
      const matchesName = qLower
        ? String(c.name || "").toLowerCase().includes(qLower)
        : true;

      // party match (handles API returning id or nested object)
      const pid = typeof c.party === "object" ? c.party?.id : c.party;
      const matchesParty = partyId ? pid === partyId : true;

      // position match
      const matchesPos = pos ? c.position === pos : true;

      return matchesName && matchesParty && matchesPos;
    });
  }, [candidates, q, selectedParty, selectedPosition]);

  const grouped = useMemo(() => {
    const groups = {
      president: [],
      governor: [],
      mp: [],
    };
    filtered.forEach((c) => {
      if (c.position && groups[c.position]) groups[c.position].push(c);
    });
    return groups;
  }, [filtered]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <p className="text-gray-600">Loading…</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 to-purple-800 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Countdown */}
          <section className="bg-blue-50 dark:bg-blue-900 text-center py-6 px-4 rounded-xl shadow mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 dark:text-white mb-2">
              Countdown to General Election
            </h2>
            <p className="text-lg sm:text-xl font-mono text-blue-700 dark:text-blue-300">
              {countdown}
            </p>
          </section>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Discover Kenyan Leaders for the 2025 Elections
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-6">
            Explore candidates by county, constituency, and party. Stay informed. Vote wisely.
          </p>

          <div className="flex justify-center flex-wrap gap-4">
            <a
              href="/rating-criteria"
              className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-100 hover:text-gray-900"
            >
              How We Rate Leaders
            </a>
            <a
              href="/counties"
              className="bg-white text-blue-800 px-6 py-3 rounded-lg font-bold hover:bg-gray-100"
            >
              🌍 Browse Counties
            </a>
            <a
              href="/presidential-rank"
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300"
            >
              🏆 View Top Presidential Candidates
            </a>
          </div>
        </div>
      </section>

      {/* What is ElectionHub */}
      <section id="about" className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What is ElectionHub?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            ElectionHub is a public information portal built for Kenyans to easily find and compare
            candidates running for office in 2025. From Presidential candidates to local leaders in
            your constituency — we're making access simple, fair, and visual.
          </p>
        </div>
      </section>

      {/* Counties & Constituencies explainer */}
      <section className="bg-blue-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">
            🗺️ Kenya is Organized by Counties & Constituencies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoCard
              title="What is a County?"
              borderClass="border-blue-500"
              titleClass="text-blue-800"
              text="Kenya has 47 counties. Each county contains several constituencies and local leaders."
            />
            <InfoCard
              title="What is a Constituency?"
              borderClass="border-green-500"
              titleClass="text-green-800"
              text="Each county is made up of smaller regions called constituencies, where MPs are elected to represent you."
            />
            <InfoCard
              title="How to Explore?"
              borderClass="border-purple-500"
              titleClass="text-purple-800"
              text='Click on "Browse Counties" to explore all regions and drill down to view individual candidates.'
            />
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            🔍 Filter Candidates by Name, Party, or Office
          </h2>

          <form
            className="bg-gray-100 p-6 sm:p-8 rounded-xl shadow-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="e.g. Wanjohi"
                    className="w-full rounded-lg border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Party */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Party</label>
                <select
                  value={selectedParty}
                  onChange={(e) => setSelectedParty(e.target.value)}
                  className="w-full p-2 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Parties</option>
                  {parties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Position */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Office</label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full p-2 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Offices</option>
                  <option value="president">President</option>
                  <option value="governor">Governor</option>
                  <option value="mp">Member of Parliament</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Candidate sections */}
      <section id="candidates" className="bg-blue-50">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
          🧑🏾‍💼 Candidates You Can Explore
        </h2>

        <main className="max-w-7xl mx-auto px-6 pb-16">
          <CandidateSection
            title="Presidential Candidates"
            list={grouped.president}
            partyName={partyName}
            countyName={countyName}
            constituencyName={constituencyName}
          />
          <CandidateSection
            title="Governors"
            list={grouped.governor}
            partyName={partyName}
            countyName={countyName}
            constituencyName={constituencyName}
          />
          <CandidateSection
            title="Members of Parliament (MPs)"
            list={grouped.mp}
            partyName={partyName}
            countyName={countyName}
            constituencyName={constituencyName}
          />
        </main>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white mt-20 py-10 text-center text-sm px-6">
        <p>&copy; 2025 ElectionHub Kenya — Empowering Informed Voting</p>
        <div className="mt-2 space-x-4">
          <a href="/counties" className="hover:underline text-blue-300">
            Browse Counties
          </a>
          <a href="/presidential-rank" className="hover:underline text-blue-300">
            Presidential Ranking
          </a>
          <a href="mailto:support@electionhub.ke" className="hover:underline text-blue-300">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Small presentational components ---------- */

function InfoCard({ title, text, borderClass, titleClass }) {
  return (
    <div className={`bg-white shadow-lg rounded-xl p-6 border-l-4 ${borderClass}`}>
      <h3 className={`text-xl font-semibold mb-2 ${titleClass}`}>{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

function CandidateSection({ title, list, partyName, countyName, constituencyName }) {
  if (!list?.length) return null;
  return (
    <section className="mb-16">
      <h3 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 border-b-4 border-blue-200 pb-2">
        {title}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            {c.photo ? (
              <img
                src={mediaURL(c.photo)}
                alt={c.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="bg-blue-100 h-48 flex items-center justify-center text-3xl font-bold text-blue-700">
                {String(c.name || "?").slice(0, 1)}
              </div>
            )}

            <div className="p-4 space-y-1">
              <h4 className="text-lg font-semibold">{c.name}</h4>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Party:</span> {partyName(c.party)}
              </p>
              {c.county && (
                <p className="text-sm text-gray-600">County: {countyName(c.county)}</p>
              )}
              {c.constituency && (
                <p className="text-sm text-gray-600">
                  Constituency: {constituencyName(c.constituency)}
                </p>
              )}
            </div>

            <a
              href={`/candidateprof/${c.id}`}
              className="block text-center bg-blue-600 text-white py-2 text-sm font-semibold hover:bg-blue-700 transition"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
