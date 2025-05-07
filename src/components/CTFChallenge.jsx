import React from "react";
import challenges from "../data/challenges";
import Card from "./Card";

const CTFChallenge = () => {
  return (
    <div className="lg:h-[80vh] bg-gray-900 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {challenges.map((challenge, index) => (
    <Card
      key={index}
      title={challenge.title}
      description={challenge.description}
      flag={challenge.flag}
      index={index}
      point={challenge.point}
      img={challenge.img}
    />
  ))}
</div>
  );
};

export default CTFChallenge;
