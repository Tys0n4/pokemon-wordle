import { useState } from "react";

export default function PokemonSelect({ pokemonList, guess, setGuess }) {
    const [filteredPokemon, setFilteredPokemon] = useState([]);

    const handleInputChange = (event) => {
        const input = event.target.value.toLowerCase();
        setGuess(input);

        // Filter Pokémon based on the input
        const matches = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(input)
        );
        setFilteredPokemon(matches);
    };

    const handleSuggestionClick = (name) => {
        setGuess(name);
        setFilteredPokemon([]); // Clear the suggestions
    };

    return (
        <div className="relative flex flex-col items-center mt-8 pb-3">
            <input
                type="text"
                value={guess}
                onChange={handleInputChange}
                placeholder="Type to search Pokémon"
                className="w-64 p-2 border-purple-600 rounded-lg text-white bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
            />


            {filteredPokemon.length > 0 && (
                <ul className="absolute z-20 bg-white border border-gray-300 rounded-lg shadow-lg mt-12 w-64 max-h-48 overflow-y-auto">
                {filteredPokemon.map((pokemon) => (
                    <li
                    key={pokemon.name}
                    onClick={() => handleSuggestionClick(pokemon.name)}
                    className="p-3 hover:bg-purple-800 hover:text-white cursor-pointer text-purple-600 text-left border-b border-gray-200 last:border-b-0"
                    >
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </li>
                ))}
                </ul>
            )}
        </div>
    );
}
