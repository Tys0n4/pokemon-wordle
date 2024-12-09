export default function GameOver({ targetPokemon, attempts, restartGame }) {
    return (
        <div className="text-white text-center bg-gradient-to-b from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">🎉 Game Over 🎉</h2>
            <div className="target-pokemon">
                <h3 className="text-xl font-semibold mb-2">Correct Pokémon</h3>
                {targetPokemon.image && (
                    <img
                        src={targetPokemon.image}
                        alt={`Image of ${targetPokemon.name}`}
                        className="w-24 h-24 mx-auto mb-4"
                    />
                )}
                <p><strong>Name:</strong> {targetPokemon.name}</p>
                <p><strong>Type 1:</strong> {targetPokemon.type1}</p>
                <p><strong>Type 2:</strong> {targetPokemon.type2 || "N/A"}</p>
                <p><strong>Color:</strong> {targetPokemon.color || "N/A"}</p>
                <p><strong>Habitat:</strong> {targetPokemon.habitat}</p>
            </div>
            <button
                onClick={restartGame}
                className="mt-6 px-4 py-2 bg-gradient-to-tr from-gray-700 via-gray-900 to-gray-700 hover:bg-gray-200 text-white font-semibold rounded-lg"
            >
                Restart Game
            </button>
        </div>
    );
}
