import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

const sanitizeEmail = (email) =>
  email.replace(/\./g, "_dot_").replace(/@/g, "_at_");

const Card = ({ title, index, point }) => {
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
    <div className="bg-purple-100 text-white p-5 border-2 border-purple-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-32">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-semibold">
          {point}
        </span>
      </div>

      <button
        onClick={handleSolveClick}
        disabled={solved}
        className={`w-full py-2 rounded font-medium transition duration-300 ${
          solved
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 text-white"
        }`}
      >
        {solved ? "Solved ✅" : "Solve"}
      </button>
    </div>
  );
};

export default Card;
