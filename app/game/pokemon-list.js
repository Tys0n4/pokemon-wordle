"use client"

import { useEffect, useState } from "react";
import GameControls from "./game-controls";
import PokemonSelect from "./pokemon-select";
import GameOver from "./game-over";
import GuessData from "./guess-data";

export default function PokemonList(){

    const [pokemonList, setPokemonList] = useState([]);
    const [targetPokemon, setTargetPokemon] = useState([]);
    const [guess, setGuess] = useState("");
    const [attempts, setAttempts] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    async function fetchPokemonList() {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
            const data = await response.json();
            const results = data.results;
            setPokemonList(results);
            initializeGame(results);
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    };

    useEffect( () => {
        fetchPokemonList();
    }, [] );
    
    async function initializeGame(pokemonList) {
        try {
            if (!pokemonList || pokemonList.length === 0) return;

            const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];

            const response = await fetch(randomPokemon.url);
            if (!response.ok) throw new Error("Failed to fetch Pokémon data");
            const data = await response.json();

            // Fetch additional data (e.g., habitat, color, and image)
            const speciesResponse = await fetch(data.species.url);
            if (!speciesResponse.ok) throw new Error("Failed to fetch species data");
            const speciesData = await speciesResponse.json();

            setTargetPokemon({
                name: data.name,
                type1: data.types[0]?.type.name,
                type2: data.types[1]?.type.name || null,
                color: speciesData.color?.name || "unknown",
                habitat: speciesData.habitat?.name || "unknown",
                image: data.sprites.front_default,
            });

            setGuess("");
            setAttempts([]);
            setGameOver(false);
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    };

    async function handleGuessSubmit() {
        try {
            if (gameOver || guess === "") return;
        
            // Check if the guess has already been made
            if (attempts.some((attempt) => attempt.guess === guess)) {
              alert("You've already guessed that Pokémon! Try a different one.");
              return;
            }
        
            // Fetch Pokémon details from the list
            const guessedPokemon = pokemonList.find((p) => p.name.toLowerCase() === guess.toLowerCase());
            if (!guessedPokemon) {
              alert("That Pokémon doesn't exist. Try again!");
              return;
            }
        
            // Fetch data for the guessed Pokémon
            const response = await fetch(guessedPokemon.url);
            if (!response.ok) throw new Error("Failed to fetch guessed Pokémon data.");
            const data = await response.json();
        
            // Fetch species data
            const speciesResponse = await fetch(data.species.url);
            if (!speciesResponse.ok) throw new Error("Failed to fetch species data.");
            const speciesData = await speciesResponse.json();
        
            // Construct the Pokémon data
            const pokemon = {
              name: data.name,
              type1: data.types[0]?.type.name,
              type2: data.types[1]?.type.name || null,
              color: speciesData.color?.name || "unknown",
              habitat: speciesData.habitat?.name || "unknown",
              image: data.sprites.front_default,
            };
        
            // Get feedback for the guess
            const feedback = getFeedback(pokemon, targetPokemon);
        
            // Update the attempts with the new guess
            setAttempts([
                ...attempts,
                {
                    guess: pokemon.name,
                    feedback,
                    type1: pokemon.type1,
                    type2: pokemon.type2,
                    color: pokemon.color,
                    habitat: pokemon.habitat,
                    image: pokemon.image, // Store the image URL for this attempt
                },
            ]);
        
            // If all feedback is correct, the game ends
            if (feedback.every((f) => f === "correct")) {
              setGameOver(true);
            }
        
            // Clear the guess input
            setGuess("");
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    };

    // Get feedback for the guess
    const getFeedback = (pokemon, target) => {
        return [
        pokemon.name.toLowerCase() === target.name.toLowerCase() ? "correct" : "incorrect",
        pokemon.type1 === target.type1 ? "correct" : "incorrect",
        pokemon.type2 === target.type2 ? "correct" : "incorrect",
        pokemon.color === target.color ? "correct" : "incorrect",
        pokemon.habitat === target.habitat ? "correct" : "incorrect",
        ];
    };

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-950 via-pink-950 to-black text-white">
        <h1 className="text-purple-200">Pokémon Guessing Game</h1>

        {gameOver ? (
            <GameOver
                targetPokemon={targetPokemon}
                attempts={attempts}
                restartGame={() => initializeGame(pokemonList)}
            />
        ) : (
            <div>
                {/* Display the target Pokémon's image */}
                {targetPokemon.image && (
                    <img
                        src={targetPokemon.image}
                        alt={targetPokemon.name}
                        className="w-32 h-32 mx-auto"
                    />
                )}

                <PokemonSelect pokemonList={pokemonList} guess={guess} setGuess={setGuess} />
                <GameControls handleGuessSubmit={handleGuessSubmit} resetGame={() => initializeGame(pokemonList)} />
            </div>
        )}

        <div>
            {attempts.map((attempt, index) => (
                <GuessData key={index} attempt={attempt} />
            ))}
        </div>
    </div>
    );
}