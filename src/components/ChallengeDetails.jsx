import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import challenges from "../data/challenges";

const sanitizeEmail = (email) => {
  return email.replace(/\./g, "_dot_").replace(/@/g, "_at_");
};

const ChallengeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const challenge = challenges[parseInt(id)];

  const [user, setUser] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [isAlreadyCompleted, setIsAlreadyCompleted] = useState(false);

  useEffect(() => {
    if (!challenge) {
      navigate("/");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const emailKey = sanitizeEmail(currentUser.email);

        // Check if the challenge is already completed
        const challengeRef = ref(db, `${id}/${emailKey}`);
        const challengeSnap = await get(challengeRef);
        if (challengeSnap.exists() && challengeSnap.val() === true) {
          setIsAlreadyCompleted(true);
        }

        // Get or initialize score
        const scoreRef = ref(db, `scores/${emailKey}`);
        const scoreSnap = await get(scoreRef);
        if (scoreSnap.exists()) {
          setScore(scoreSnap.val());
        } else {
          await set(scoreRef, 0);
          setScore(0);
        }
      }
    });

    return () => unsubscribe();
  }, [challenge, navigate, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setFeedback("❗ Please sign in to submit answers.");
      return;
    }

    if (isAlreadyCompleted) {
      setFeedback("❗ You've already completed this challenge!");
      return;
    }

    if (userAnswer.trim() === challenge.flag.trim()) {
      const emailKey = sanitizeEmail(user.email);
      const newScore = score + challenge.point;

      // Update score
      await set(ref(db, `scores/${emailKey}`), newScore);

      // Mark challenge as completed
      await set(ref(db, `${id}/${emailKey}`), true);

      setScore(newScore);
      setIsAlreadyCompleted(true);
      setFeedback(`✅ Correct! +${challenge.point} Points`);
    } else {
      setFeedback("❌ Incorrect. Try again!");
    }

    setUserAnswer("");
  };

  if (!challenge) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Challenge Not Found</h2>
        <p>Please check the URL or select a valid challenge.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-2">
        {challenge.title}
        {isAlreadyCompleted && (
          <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
            Completed
          </span>
        )}
      </h2>
      <p className="text-gray-800 mb-4 whitespace-pre-line break-words">
        {challenge.description}
      </p>

      {challenge.img && (
        <button
          onClick={() => {
            const link = document.createElement("a");
            link.href = challenge.img;
            link.download = `${challenge.title}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Download Image
        </button>
      )}

      {challenge.file && (
        <button
          onClick={() => {
            const link = document.createElement("a");
            link.href = challenge.file;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Download File
        </button>
      )}

      {!isAlreadyCompleted ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
          <input
            type="text"
            placeholder="Enter the flag like ISTEHITSC{flag...}"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="mt-4 p-4 bg-green-50 text-green-800 rounded">
          You've already solved this challenge!
        </div>
      )}

      {feedback && <p className="mt-3 font-semibold text-md">{feedback}</p>}
      <p className="mt-1 text-sm text-gray-600">Your Total Score: {score}</p>
    </div>
  );
};

export default ChallengeDetails;
