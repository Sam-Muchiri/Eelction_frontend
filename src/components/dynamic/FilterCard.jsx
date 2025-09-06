import React from 'react'
import { Search } from 'lucide-react'
const FilterCard = (
    {
    q, setQ,
    selectedParty, setSelectedParty,
    selectedPosition, setSelectedPosition,
    parties
    }
) => {
  return (
    <div>
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
    </div>
  )
}

export default FilterCard