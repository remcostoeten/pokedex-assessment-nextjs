"use client";

import { Pokemon } from "@/core/types/pokemon";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "../badge";

type PokemonListProps = {
  pokemons: Pokemon[];
};

// why not....
const typeColors: { [key: string]: string } = {
  grass: "bg-green-500",
  fire: "bg-red-500",
  water: "bg-blue-500",
  bug: "bg-green-700",
  normal: "bg-gray-500",
};

export default function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <div className="p-4 bg-arcady-bg-100 min-h-screen">
      <h1 className="text-white text-4xl font-bold underline mb-8">Pokedex</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {pokemons.map((pokemon) => {
          const [imageSrc, setImageSrc] = useState(
            pokemon.sprites.front_default,
          );
          return (
            <div
              key={pokemon.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out relative"
            >
              <Link
                href={`/pokemon/${pokemon.id}`}
                className="block p-4 text-center text-blue-500 hover:text-blue-700"
              >
                <div className="relative">
                  {pokemon.sprites.front_default && (
                    <Image
                      width={96}
                      height={96}
                      onMouseEnter={() =>
                        setImageSrc(pokemon.sprites.back_default)
                      }
                      onMouseLeave={() =>
                        setImageSrc(pokemon.sprites.front_default)
                      }
                      src={imageSrc}
                      alt={`${pokemon.name} front`}
                      className="mx-auto transition-opacity duration-300 ease-in-out"
                    />
                  )}
                </div>
                <p className="text-xl font-medium text-center">
                  {pokemon.name}
                </p>
                {pokemon.types.map((type: any) => (
                  <Badge
                    key={type.type.name}
                    className={typeColors[type.type.name] || "bg-gray-500 mr-1"}
                  >
                    {type.type.name}
                  </Badge>
                ))}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
