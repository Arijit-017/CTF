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
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h2 className="text-3xl font-semibold mb-6">Leaderboard</h2>
      <table className="table-auto w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-purple-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Rank</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((user, index) => (
            <tr key={user.email} className="border-t border-gray-300 hover:bg-gray-50">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
