'use client';
import React, {useState} from 'react';

interface Pokemon {
  id: string;
  name: string;
  type: string;
  generation: string;
}

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

    const fetchData = async () => {
        const reponse = await fetch("http://0.0.0.0:8000/pokemon");
        const pokemons = await reponse.json();
        const myPokemon = pokemons.filter((p: Pokemon) => p.name === inputValue);
        if (myPokemon.length === 0) {
            setError("Ce Pokémon n'existe pas");
            return;
        }
        setPokemon(myPokemon[0])
        setError(null)
    };

    const resetData = () => {
        setPokemon(null);
        setInputValue('');
        setError(null);
    }

    return (
        <main className='relative flex min-h-screen flex-col items-center justify-evenly gap-5 p-24'>
            <div className='w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex'>
                <button
                    onClick={resetData}
                    className='left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 text-xl backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200  lg:p-4 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:dark:bg-zinc-800/30'
                >
                    POKEMON GENERATOR
                </button>
            </div>
            {!pokemon ? (
                <div className='flex flex-col items-center justify-center gap-7'>
                    <p>
                        Vous recherchez un Pokémon en particulier ? Vous êtes au bon endroit
                        !
                    </p>
                    <input
                        type='text'
                        value={inputValue}
                        className={
                            'w-8/12 rounded-lg border-2 border-gray-300 p-2 text-black'
                        }
                        onChange={handleInputChange}
                        placeholder='Entre le nom du pokemon'
                    />
                    <button
                        className={
                            'w-6/12 rounded-lg border-2 border-gray-300 bg-gray-50 p-2'
                        }
                        onClick={fetchData}
                    >
                        <p className={'text-black'}>Rechercher</p>
                    </button>
                    {error && <p className={'text-white'}>{error}</p>}
                </div>
            ) : (
                <div className={'align-center text-center'}>
                    <p>Salut Moldu ! Tu veux voir un Pokémon ? Me voici !</p>
                    <p className={'mt-5 font-extrabold'}>
                        Je suis le pokemon {pokemon.name}, je suis de type {pokemon.type} et de la génération {pokemon.generation} !
                    </p>
                </div>
            )}
        </main>
    );
}
