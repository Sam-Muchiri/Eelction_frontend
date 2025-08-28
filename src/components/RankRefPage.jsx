import React, {useState} from 'react'

const RankRefPage = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-16">

        <header className="text-center space-y-3 fade-in">
          <h1 className="text-4xl font-extrabold text-blue-900">How We Rate Kenyan Leaders</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Your vote shapes Kenya’s future. Understand our fair, clear criteria to pick the best leaders.
          </p>
        </header>
        <section id="criteria" className="space-y-12 fade-in">
          <h2 className="text-3xl font-bold text-blue-800 border-b-4 border-blue-400 pb-2">1. Rating Criteria Explained</h2>

          <div className="grid gap-8 md:grid-cols-2">
            <article className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Development Projects</h3>
              <p className="text-gray-700 mb-3">
                Measures real, completed projects that improve people’s lives: roads, schools, water, health centers.
              </p>
              <p className="italic text-sm text-gray-500 mb-3">Example:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li><strong>James Kang'ata</strong>, former Governor of Kiambu, known for roads and healthcare initiatives.</li>
                <li><strong>Warning:</strong> Leaders who promise but don’t deliver lose public trust and waste resources.</li>
              </ul>
            </article>
            <article className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Experience</h3>
              <p className="text-gray-700 mb-3">
                Years in leadership roles show how much they understand government and governance challenges.
              </p>
              <p className="italic text-sm text-gray-500 mb-3">Example:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li><strong>Moses Kuria</strong>, an MP with multiple terms’ experience.</li>
                <li><strong>Warning:</strong> Inexperienced leaders might struggle to manage complex issues.</li>
              </ul>
            </article>
            <article className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Education</h3>
              <p className="text-gray-700 mb-3">
                Formal education helps leaders analyze problems and find effective solutions.
              </p>
              <p className="italic text-sm text-gray-500 mb-3">Example:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li><strong>Uhuru Kenyatta</strong>, former President, studied at top universities.</li>
                <li><strong>Warning:</strong> Limited education can limit governance quality.</li>
              </ul>
            </article>

            <article className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Public Approval</h3>
              <p className="text-gray-700 mb-3">
                Polls and surveys that show how much citizens trust and like the candidate.
              </p>
              <p className="italic text-sm text-gray-500 mb-3">Example:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>High approval means strong citizen support.</li>
                <li>Low approval warns of dissatisfaction and mistrust.</li>
              </ul>
            </article>

            <article className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Manifesto</h3>
              <p className="text-gray-700 mb-3">
                Clear, realistic plans for Kenya’s future development.
              </p>
              <p className="italic text-sm text-gray-500 mb-3">Example:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Strong manifestos outline education, healthcare, infrastructure improvements.</li>
                <li>Vague or unrealistic promises indicate lack of preparedness.</li>
              </ul>
            </article>

            <article className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Integrity</h3>
              <p className="text-gray-700 mb-3">
                Leaders without corruption allegations or unethical behavior.
              </p>
              <p className="italic text-sm text-gray-500 mb-3">Example:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Leaders with clean records earn greater trust.</li>
                <li>Corruption charges undermine leadership credibility.</li>
              </ul>
            </article>
            <article className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Engagement</h3>
              <p className="text-gray-700 mb-3">
                How often leaders listen and respond to citizens' needs.
              </p>
              <p className="italic text-sm text-gray-500 mb-3">Example:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Leaders who hold town halls and answer concerns.</li>
                <li>Ignoring constituents after elections is a red flag.</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="scores" className="fade-in space-y-8">
          <h2 className="text-3xl font-bold text-blue-800 border-b-4 border-blue-400 pb-2">2. What the Scores Mean</h2>
          <p className="text-gray-700 max-w-prose mx-auto text-center mb-6">
            Each candidate gets a final score from 0 to 100 based on the criteria above.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold mb-2">70% and above</h3>
              <p className="text-sm">✅ <strong>Excellent</strong>: Strong leader, highly recommended.</p>
            </div>
            <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold mb-2">60% - 69%</h3>
              <p className="text-sm">⚠️ <strong>Good</strong>: Solid leader with minor concerns.</p>
            </div>
            <div className="bg-orange-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold mb-2">50% - 59%</h3>
              <p className="text-sm">❗ <strong>Risky</strong>: Consider carefully; some weaknesses.</p>
            </div>
            <div className="bg-red-700 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold mb-2">Below 50%</h3>
              <p className="text-sm">🚫 <strong>Gamble</strong>: Poor choice; potential harm to Kenya.</p>
            </div>
          </div>
        </section>
        <section id="why" className="fade-in space-y-8">
          <h2 className="text-3xl font-bold text-blue-800 border-b-4 border-blue-400 pb-2">3. Why This Matters for Kenya</h2>
          <p className="text-gray-700 max-w-prose mx-auto">
            Kenya's progress depends on capable leaders from Presidents to MPs. Choose wisely:
          </p>
          <ul className="list-disc list-inside text-gray-700 max-w-prose mx-auto space-y-3">
            <li>
              <strong>Good Role Model:</strong> 
              <a href="https://en.wikipedia.org/wiki/James_Kang%27ata" target="_blank" className="text-blue-600 hover:underline">James Kang'ata</a>, Kiambu Governor known for development and clean governance.
            </li>
            <li>
              <strong>Risk Example:</strong> Some governors and MPs have faced corruption charges hurting development.
            </li>
            <li>
              <strong>Presidential Leadership:</strong> 
              <a href="https://en.wikipedia.org/wiki/Daniel_arap_Moi" target="_blank" className="text-blue-600 hover:underline">Daniel arap Moi</a> brought stability but faced criticism for corruption late in his tenure.
            </li>
            <li>
              <strong>Voter Power:</strong> Your vote can change Kenya’s future — choose leaders who deliver, listen, and lead honestly.
            </li>
          </ul>
        </section>

        <section className="text-center">
          <a href="/" 
            className="inline-block bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-800 transition-colors">
            ← Back to Home
          </a>
        </section>

      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        Data from <a href="https://www.iebc.or.ke" target="_blank" className="underline hover:text-blue-600">IEBC</a> and public sources. Independent, non-partisan rating.
      </footer>
    </div>
  )
}

export default RankRefPage