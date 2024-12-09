export default function GuessData({ attempt }) {
    // Helper function to determine the Tailwind class based on feedback
    const getFeedbackClass = (feedback) => {
      if (feedback === "correct") return "bg-green-500 text-white p-2 rounded w-24 h-24 flex items-center justify-center";
      if (feedback === "incorrect") return "bg-red-500 text-white p-2 rounded w-24 h-24 flex items-center justify-center";
      return "bg-gray-600 text-white p-2 rounded flex items-center justify-center"; // Default style
    };
  
    return (
      <div className="flex justify-center mt-4">
        
        <div className="text-center m-2">
          <div className="font-bold text-white">Pokémon</div>
          <div className="w-24 h-24 ">
          {attempt.image ? (
            <img
              src={attempt.image}
              alt={attempt.guess}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-purple-200">N/A</span>
          )}
          </div>
        </div>

        <div className="text-center m-2">
          <div className="font-bold text-white">Name</div>
          <div className={getFeedbackClass(attempt.feedback[0])}>
            {attempt.guess}
          </div>
        </div>

        <div className="text-center m-2">
          <div className="font-bold text-white">Type 1</div>
          <div className={getFeedbackClass(attempt.feedback[1])}>
            {attempt.type1}
          </div>
        </div>

        <div className="text-center m-2">
          <div className="font-bold text-white">Type 2</div>
          <div className={getFeedbackClass(attempt.feedback[2])}>
            {attempt.type2 || "N/A"}
          </div>
        </div>

        <div className="text-center m-2">
          <div className="font-bold text-white">Color</div>
          <div className={getFeedbackClass(attempt.feedback[3])}>
            {attempt.color}
          </div>
        </div>

        <div className="text-center m-2">
          <div className="font-bold text-white">Habitat</div>
          <div className={getFeedbackClass(attempt.feedback[4])}>
            {attempt.habitat}
          </div>
        </div>

      </div>
    );
  }
  