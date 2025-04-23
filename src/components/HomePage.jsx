import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

const sanitizeEmail = (email) => {
  return email.replace(/\./g, "_dot_").replace(/@/g, "_at_"); // use this consistently
};

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
  
        const emailKey = sanitizeEmail(currentUser.email);
  
        // Fetch name
        const userRef = ref(db, `users/${emailKey}`);
        const userSnap = await get(userRef);
  
        console.log("User Snapshot:", userSnap.val()); // Debug
  
        const userData = userSnap.val();
        if (userSnap.exists()) {
          if (typeof userData === 'object' && userData.name) {
            setName(userData.name);
          } else if (typeof userData === 'string') {
            setName(userData); // If you stored just the name string
          }
        }
  
        // Fetch score
        const scoreRef = ref(db, `scores/${emailKey}`);
        const scoreSnap = await get(scoreRef);
        if (scoreSnap.exists()) {
          setScore(scoreSnap.val());
        } else {
          setScore(0);
        }
      } else {
        navigate('/signin');
      }
    });
  
    return () => unsubscribe();
  }, [navigate]);
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-3xl font-semibold mb-6">HomePage</h2>

      {user ? (
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
          <p className="mb-2">
            <span className="font-medium">Name:</span> {name}
          </p>
          <p className="mb-2">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="mb-2">
            <span className="font-medium">Score:</span> {score}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">Loading user info...</p>
      )}
    </div>
  );
};

export default HomePage;
