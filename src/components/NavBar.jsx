"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"
import { Menu, X } from "lucide-react"

const NavBar = () => {
  const [user, setUser] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await signOut(auth)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-purple-100 border-b-2 rounded-lg border-purple-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold text-black tracking-wide flex items-center group">
            <span className="transition-all duration-300">
              ExploitX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-black hover:text-purple-900 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-purple-400 after:transition-all after:duration-300"
            >
              Home
            </Link>
            <Link
              to="/leaderboard"
              className="text-black hover:text-purple-900 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-purple-400 after:transition-all after:duration-300"
            >
              Leaderboard
            </Link>
            <Link
              to="/ctf"
              className="text-black hover:text-purple-900 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-purple-400 after:transition-all after:duration-300"
            >
              Challenges
            </Link>

            {/* Only show these if NOT logged in */}
            {!user && (
              <>
                <Link
                  to="/signin"
                  className="text-black border-2 border-purple-500 hover:bg-purple-500/10 px-5 py-2 rounded-md font-medium transition-all duration-200"
                >
                  Sign In
                </Link>
              </>
            )}

            {/* Only show this if logged in */}
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm font-medium px-3 py-1 bg-purple-900 rounded-full border border-gray-700">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-black focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-3 border-t border-gray-700 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-black hover:text-purple-400 font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/leaderboard"
                className="text-black hover:text-purple-400 font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <Link
                to="/ctf"
                className="text-black hover:text-purple-400 font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Challenges
              </Link>

              {/* Only show these if NOT logged in */}
              {!user && (
                <div className="flex flex-col space-y-3 pt-2">
                  <Link
                    to="/signup"
                    className="text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-5 py-2 rounded-md font-medium transition-all duration-200 text-center shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/signin"
                    className="text-black border-2 border-purple-500 hover:bg-purple-500/10 px-5 py-2 rounded-md font-medium transition-all duration-200 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              )}

              {/* Only show this if logged in */}
              {user && (
                <div className="flex flex-col space-y-3 pt-2">
                  <span className="text-white text-sm font-medium px-3 py-2 bg-purple-900 rounded-md border border-gray-700">
                    {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 shadow-md"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
