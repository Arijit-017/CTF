import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, get } from 'firebase/database';

const unsanitizeEmail = (key) => {
  return key.replace(/_at_/g, '@').replace(/_dot_/g, '.');
};

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const scoreRef = ref(db, 'scores');
      const snapshot = await get(scoreRef);

      if (snapshot.exists()) {
        const data = snapshot.val();

        // Convert object to array of { email, score }
        const users = Object.entries(data).map(([key, score]) => ({
          email: unsanitizeEmail(key),
          score
        }));

        // Sort descending by score
        users.sort((a, b) => b.score - a.score);

        setLeaders(users);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 p-6">
  <h2 className="text-3xl font-semibold text-white mb-8">Leaderboard</h2>
  <div className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-700">
    <table className="table-auto w-full">
      <thead className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
        <tr>
          <th className="py-4 px-6 text-left font-semibold">Rank</th>
          <th className="py-4 px-6 text-left font-semibold">Email</th>
          <th className="py-4 px-6 text-left font-semibold">Score</th>
        </tr>
      </thead>
      <tbody>
        {leaders.map((user, index) => (
          <tr
            key={user.email}
            className={`border-t border-gray-700 hover:bg-gray-700 ${
              index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'
            }`}
          >
            <td className="py-4 px-6 text-white">{index + 1}</td>
            <td className="py-4 px-6 text-gray-300">{user.email}</td>
            <td className="py-4 px-6 text-yellow-400">{user.score}</td>
          </tr>
        ))}
        {leaders.length === 0 && (
          <tr>
            <td className="py-4 px-6 text-center text-gray-500" colSpan="3">
              No leaders to display yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default Leaderboard;
