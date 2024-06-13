

'use client';

import {toast} from "sonner";
import React, { useEffect, useState } from "react";
import { Pokemon as PokemonType, typeColors } from "@/core/types/pokemon";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { inventory } from "@/core/inventory";
import { Button } from "../button";

type PokemonListProps = {
  pokemons: PokemonType[];
};

export default function PokemonList({ pokemons }: PokemonListProps) {
  const [caughtPokemons, setCaughtPokemons] = useState<number[]>([]);
  const [imageSrcs, setImageSrcs] = useState<{ [key: number]: string }>(
    pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = pokemon.sprites.front_default;
      return acc;
    }, {} as { [key: number]: string })
  );

  const handleCatch = (id?: number) => {
    if (id !== undefined) {
      setCaughtPokemons((prevCaught) => [...prevCaught, id]);
    }
  };

  useEffect(() => {
    if (caughtPokemons.length > 0) {
      toast("🎶 tuntuntun - tututtutuduu 🎶");
    }
  }, [caughtPokemons.length]);

  const handleMouseEnter = (id: number, shinySrc: string) => {
    setImageSrcs((prevSrcs) => ({
      ...prevSrcs,
      [id]: shinySrc,
    }));
  };

  const handleMouseLeave = (id: number, defaultSrc: string) => {
    setImageSrcs((prevSrcs) => ({
      ...prevSrcs,
      [id]: defaultSrc,
    }));
  };

  return (
    <div className="p-4 bg-arcady-bg-100 min-h-screen">
      <h1 className="text-white text-4xl font-bold underline mb-8">Pokedex</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {pokemons.map((pokemon) => {
          const isCaught = caughtPokemons.includes(pokemon.id);
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
                        handleMouseEnter(pokemon.id, pokemon.sprites.front_shiny)
                      }
                      onMouseLeave={() =>
                        handleMouseLeave(pokemon.id, pokemon.sprites.front_default)
                      }
                      src={imageSrcs[pokemon.id]}
                      alt={`${pokemon.name} front`}
                      className="mx-auto transition-opacity duration-300 ease-in-out"
                    />
                  )}
                </div>
                <p className="text-xl font-medium text-center">
                  {pokemon.name}
                </p>
                {pokemon.types.map((type) => (
                  <Badge
                    key={type.type.name}
                    className={typeColors[type.type.name] || "bg-gray-500 mr-1"}
                  >
                    {type.type.name}
                  </Badge>
                ))}
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    onClick={() => handleCatch(pokemon.id)}
                    className={`mt-2 p-2 w-[100%] ${isCaught ? "bg-green-500" : "bg-blue-500"} text-white rounded`}
                    disabled={isCaught}
                  >
                    {isCaught ? "Caught" : "Catch"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Inventory</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {inventory.map((item) => (
                    <React.Fragment key={item.item}>
                      <DropdownMenuItem
                        className="cursor-pointer w-full"
                        onClick={() => handleCatch(pokemon.id)}
                      >
                        {`${item.item} - ${item.count} pcs`}
                      </DropdownMenuItem>
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
      </div>
    </div>
  );
}