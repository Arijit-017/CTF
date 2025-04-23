import React from "react";
import challenges from "../data/challenges";
import Card from "./Card";

const CTFChallenge = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {challenges.map((challenge, index) => (
        <Card
          key={index}
          title={challenge.title}
          description={challenge.description}
          flag={challenge.flag}
          index={index}
          point={challenge.point}
        />
      ))}
    </div>
  );
};

export default CTFChallenge;
