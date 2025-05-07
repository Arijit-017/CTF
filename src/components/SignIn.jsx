import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("User signed in successfully!");
      navigate("/"); // Redirect to the home page after successful sign-in
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
  <h2 className="text-3xl font-semibold text-center text-white mb-6">Sign In</h2>

  <div className="mb-4">
    <label htmlFor="email" className="block text-gray-400 text-sm font-bold mb-2">
      Email
    </label>
    <input
      type="email"
      id="email"
      placeholder="your@email.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  <div className="mb-6">
    <label htmlFor="password" className="block text-gray-400 text-sm font-bold mb-2">
      Password
    </label>
    <input
      type="password"
      id="password"
      placeholder="********"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  <button
    type="submit"
    className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 focus:outline-none shadow-md"
  >
    Sign In
  </button>

  {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
  {success && <p className="mt-4 text-green-400 text-center">{success}</p>}
</form>
  );
};

export default SignIn;
