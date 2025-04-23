import { useNavigate } from "react-router-dom";

const Card = ({ title, index, point }) => {
  const navigate = useNavigate();

  const handleSolveClick = () => {
    navigate(`/challenge/${index}`);
  };

  return (
    <div className="bg-[#2a2d36] text-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-32">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full font-semibold">
          {point}
        </span>
      </div>

      <button
        onClick={handleSolveClick}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition duration-300"
      >
        Solve
      </button>
    </div>
  );
};

export default Card;
