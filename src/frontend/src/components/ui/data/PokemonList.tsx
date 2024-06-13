import { Pokemon } from '@/core/types/pokemon';
import Link from 'next/link';

type PokemonListProps = {
  pokemons: Pokemon[];
};

export default function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-center text-4xl font-bold underline mb-8">Pokémon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <Link href={`/pokemon/${pokemon.id}`} className="block p-4 text-center text-blue-500 hover:text-blue-700">
                {/* <img src={`/images/pokemon/${pokemon.id}.png`} alt={pokemon.name} className="mx-auto w-32 h-32"/> */}
                <h2 className="mt-2 font-bold">{pokemon.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}