import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


import "./App.css";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import Leaderboard from "./components/Leaderboard";
import NavBar from "./components/NavBar";
import CTFChallenge from './components/CTFChallenge';
import ChallengeDetails from "./components/ChallengeDetails";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <NavBar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/ctf" element={<CTFChallenge />} />
            <Route path="/challenge/:id" element={<ChallengeDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
