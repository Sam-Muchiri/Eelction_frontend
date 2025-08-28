import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation(); // detects current route
  const [menuOpen, setMenuOpen] = useState(false);

  // Define links per page
  const linksMap = [
  {
    pattern: /^\/$/, // homepage
    links: [
      { name: "Home", to: "/" },
      { name: "candidates", to: "#candidates" },
      { name: "Rating Criteria", to: "/rating-criteria" },
      { name: "About us", to: "#about" },
    ],
  },
  {
    pattern: /^\/counties$/,
    links: [
      { name: "All Counties", to: "/counties" },
      { name: "Home", to: "/" },
      { name: "Presidential-rankings", to: "/presidents" },
    ],
  },
  {
    pattern: /^\/county\/\d+$/, // dynamic county page
    links: [
      { name: "County Detail", to: location.pathname },
      { name: "Back to Counties", to: "/counties" },
      { name: "Governor ranking", to: "#ranking" },
      { name: "Constituencies", to: "#constituencies" },
    ],
  },
  {
    pattern: /^\/county\/\d+\/constituencies\/\d+$/, // constituency page
    links: [
      { name: "Constituency Detail", to: location.pathname },
      { name: "Ranking", to: "#ranking" },
      { name: "Home", to: "/" },
    ],
  },
  {
    pattern: /^\/rating-criteria$/,
    links: [
      { name: "Home", to: "/" },
      { name: "Rating Criteria", to: "#criteria" },
      { name: "Score Meaning", to: "#scores" },
      { name: "Why It Matters", to: "#why" },
    ],
  },
  {
    pattern: /^\/candidateprof\/\d+$/,
    links: [
      { name: "Home", to: "/" },
      { name: "manifesto", to: "#manifesto" },
      { name: "rating", to: "#rating" },
      { name: "Achievements", to: "#achievements" },
    ],
  },
];

  // Find the matching set of links; fallback to homepage links
const currentLinks =
  linksMap.find(({ pattern }) => pattern.test(location.pathname))?.links ||
  linksMap[0].links; // fallback to homepage links

  return (
    <nav className="bg-blue-800 text-white sticky top-0 z-50 shadow-md w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold hover:text-blue-300">
          Election cheatsheet
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {currentLinks.map((link, idx) =>
            link.to.startsWith("#") ? (
                <a
                key={idx}
                href={link.to}
                className="hover:text-blue-300"
                onClick={() => setMenuOpen(false)}
                >
                {link.name}
                </a>
            ) : (
                <Link
                key={idx}
                to={link.to}
                className="hover:text-blue-300"
                onClick={() => setMenuOpen(false)}
                >
                {link.name}
                </Link>
            )
            )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? (
            <span className="text-2xl font-bold">×</span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 fill-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700">
          {currentLinks.map((link, idx) =>
            link.to.startsWith("#") ? (
                <a
                key={idx}
                href={link.to}
                className="block px-4 py-2 hover:bg-blue-600"
                onClick={() => setMenuOpen(false)}
                >
                {link.name}
                </a>
            ) : (
                <Link
                key={idx}
                to={link.to}
                className="block px-4 py-2 hover:bg-blue-600"
                onClick={() => setMenuOpen(false)}
                >
                {link.name}
                </Link>
            )
            )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;
