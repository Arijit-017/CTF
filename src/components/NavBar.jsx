import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const NavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          CTF Portal
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-blue-400 font-medium transition">
            Home
          </Link>
          <Link to="/leaderboard" className="text-white hover:text-blue-400 font-medium transition">
            Leaderboard
          </Link>
          <Link to="/ctf" className="text-white hover:text-blue-400 font-medium transition">
            Challenges
          </Link>

          {/* Only show these if NOT logged in */}
          {!user && (
            <>
              <Link to="/signup" className="text-white hover:text-blue-400 font-medium transition">
                Sign Up
              </Link>
              <Link to="/signin" className="text-white hover:text-blue-400 font-medium transition">
                Sign In
              </Link>
            </>
          )}

          {/* Only show this if logged in */}
          {user && (
            <>
              <span className="text-gray-300 text-sm font-medium hidden sm:inline">
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md font-medium transition"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
