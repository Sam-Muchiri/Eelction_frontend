import React, { useEffect, useState } from "react";
import axios from "axios";
    import { UserIcon, HomeIcon, UsersIcon, MapIcon } from "@heroicons/react/24/outline";

const CountiesList = () => {
  const [counties, setCounties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch counties from your backend
    const fetchCounties = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/counties/");
        setCounties(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching counties:", error);
        setLoading(false);
      }
    };

    fetchCounties();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-purple-700">Loading counties...</p>
      </div>
    );
  }

  return (

<div className="bg-gray-50 min-h-screen">
  {/* Hero Section */}
  <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-20 px-6 overflow-hidden">
  {/* Background decorative shapes */}
  <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-2xl animate-spin-slow"></div>

  <div className="relative z-10 max-w-5xl mx-auto text-center">
    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
      Make Informed Choices for Mt. Kenya Leadership
    </h1>
    <p className="text-lg md:text-xl font-medium mb-6 drop-shadow-sm">
      Get verified insights on Presidential, Gubernatorial, and MP candidates. Compare policies, track records, and make your vote count.
    </p>

    {/* Action Buttons */}
    <div className="flex justify-center gap-4 mb-8 flex-wrap">
      <a href="#candidates" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-full shadow-md transition transform hover:scale-105">
        View Candidates
      </a>
      <a href="#guides" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-full shadow-md transition transform hover:scale-105">
        Voting Guides
      </a>
    </div>

    {/* Key Positions Icons */}
    <div className="flex justify-center gap-12 text-blue-100 flex-wrap mt-4">
      <div className="flex flex-col items-center">
        {/* President Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l1.5 4.5h4.5l-3.6 2.6 1.5 4.5-3.6-2.6-3.6 2.6 1.5-4.5L6 6.5h4.5L12 2z" />
        </svg>
        <span className="text-sm font-semibold">President</span>
      </div>

      <div className="flex flex-col items-center">
        {/* Governor Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zM4 20v-1c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4z" />
        </svg>
        <span className="text-sm font-semibold">Governor</span>
      </div>

      <div className="flex flex-col items-center">
        {/* MP Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21v-2a4 4 0 00-8 0v2M12 7a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
        <span className="text-sm font-semibold">MP</span>
      </div>
    </div>
  </div>
</section>


  {/* County Cards */}
  <section className="max-w-7xl mx-auto px-6 py-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {counties.map((county) => (
        <a
          key={county.id}
          href={`/county/${county.id}`}
          className="bg-white hover:bg-purple-50 transition-all duration-300 border border-gray-100 rounded-2xl shadow-md hover:shadow-xl group flex flex-col justify-between"
        >
          <div className="p-4 relative overflow-hidden flex flex-col justify-between h-full">
            <div className="absolute top-2 right-[-60px] rotate-45 bg-cyan-400 text-white text-xs font-semibold px-16 py-1 shadow-md">
          {county.code}
          </div>
            {/* County Symbol */}
            <div className="flex items-center justify-center h-36 mb-4 overflow-hidden rounded-xl bg-purple-50">
              {county.symbol ? (
                <img
                  src={county.symbol}
                  alt={`${county.name} symbol`}
                  className="object-contain h-full w-full p-2"
                />
              ) : (
                <span className="text-6xl font-black text-purple-500">{county.name[0]}</span>
              )}
            </div>

            {/* County Info */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-purple-800 group-hover:underline">{county.name}</h2>

              <div className="flex items-center gap-2 text-gray-600">
                <HomeIcon className="w-5 h-5 text-purple-500" />
                <span>{county.capital}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <UsersIcon className="w-5 h-5 text-purple-500" />
                <span>Population: {county.population}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <MapIcon className="w-5 h-5 text-purple-500" />
                <span>Constituencies: {county.no_of_constituencies}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <UserIcon className="w-5 h-5 text-purple-500" />
                <span>Governor: {county.current_gov || "TBA"}</span>
              </div>

              {/* Button */}
              <div className="mt-4">
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                  View {county.name} county
                </button>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  </section>
</div>

  );
};

export default CountiesList;
