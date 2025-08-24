import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">MyApp</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <a href="/#candidates"
            className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Candidates
          </a>
          <a href="/#about"
            className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            About us
          </a>
          <Link to="/counties" className="block px-6 py-3 text-gray-700 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition">
            Counties
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <a href="#candidates"
            className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Candidates
          </a>
          <a href="#about"
            className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            About us
          </a>
          <Link
            to="/counties"
            className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Counties
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar