export default function GameControls({ handleGuessSubmit, resetGame }) {
    return (
        <div className="flex gap-4">
            {/* Submit Guess Button */}
            <button
                onClick={handleGuessSubmit}
                className="px-4 py-2 bg-purple-700 text-white font-semibold rounded-md hover:bg-purple-800">
                Submit Guess
            </button>

            {/* Reset Game Button */}
            <button
                onClick={resetGame}
                className="px-4 py-2 bg-purple-900 text-white font-semibold rounded-md hover:bg-purple-800">
                Reset Game
            </button>
        </div>
    );
}
