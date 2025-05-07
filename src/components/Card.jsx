import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

const sanitizeEmail = (email) =>
  email.replace(/\./g, "_dot_").replace(/@/g, "_at_");

const Card = ({ title, index, point, description }) => {
  const navigate = useNavigate();
  const [solved, setSolved] = useState(false);
  const [userEmailKey, setUserEmailKey] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const emailKey = sanitizeEmail(user.email);
        setUserEmailKey(emailKey);
        const challengeRef = ref(db, `${index}/${emailKey}`);
        const snapshot = await get(challengeRef);
        if (snapshot.exists() && snapshot.val() === true) {
          setSolved(true);
        }
      }
    });

    return () => unsubscribe();
  }, [index]);

  const handleSolveClick = () => {
    if (!solved) {
      navigate(`/challenge/${index}`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200 p-6 border border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-auto flex flex-col justify-between">
  <div className="flex justify-between items-center">
    <h3 className="text-xl font-semibold text-white tracking-tight">{title}</h3>
    <span className="text-sm bg-green-800 text-green-200 px-3 py-1 rounded-full font-semibold shadow-sm">
      +{point}
    </span>
  </div>

  <button
    onClick={handleSolveClick}
    disabled={solved}
    className={`w-full py-2.5 rounded-md font-medium transition duration-300 shadow-md ${
      solved
        ? "bg-gray-700 text-gray-500 cursor-not-allowed shadow-none"
        : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
    }`}
  >
    {solved ? <span className="flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Solved</span> : "Solve Challenge"}
  </button>
</div>
  );
};

export default Card;
