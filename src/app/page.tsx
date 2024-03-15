"use client";
import {FormEvent, useState} from "react";

interface Pokemon {
    name: string;
    type: string;
    generation: string;
}

export default function Home() {
    const [inputValue, setInputValue] = useState('');

    const pokemonChoose = {
        name: "Bulbizar",
        type: "Electrique",
        generation: "1"
    }

    const [pokemon, setPokemon] = useState<Pokemon | null>(pokemonChoose);

    const url = "https://pokeapi.co/api/v2/pokemon/";

    async function getMyPokemon() {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputValue)
        });
        return response.json();
    }

    const handleInputChange = (event : any) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async (event : FormEvent) => {
        event.preventDefault();
        const data = await getMyPokemon()
        setPokemon(data)
    };


  return (
    <main className="flex min-h-screen relative flex-col items-center justify-evenly gap-5 p-24">
      <div className="max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
        <button onClick={() => setPokemon(null)} className="text-xl left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          POKEMON GENERATOR
        </button>
      </div>
        {!pokemon ?
        <div className="flex justify-center items-center flex-col gap-7">
            <p>
                Vous recherchez un Pokémon en particulier ? Vous êtes au bon endroit !
            </p>
            <input
                type="text"
                value={inputValue}
                className={"border-2 border-gray-300 p-2 w-8/12 rounded-lg text-black"}
                onChange={handleInputChange}
                placeholder="Entre le nom du pokemon"
            />
            <button className={"border-2 border-gray-300 bg-gray-50 p-2 w-6/12 rounded-lg"}
                    onClick={handleButtonClick}
            ><p className={"text-black"}>Rechercher</p></button>
        </div>
            :
            <div className={"text-center align-center"}>
               <p>
                   Salut Moldu ! Tu veux voir un Pokémon ? Me voici !
               </p>
                <p className={"font-extrabold mt-5"}>
                    Je suis {pokemon!.name} et je suis de type {pokemon!.type}. Je suis de la génération {pokemon!.generation} !
                </p>
            </div>
        }
    </main>
  );
}
