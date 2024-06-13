import PokemonList from "@/components/ui/data/PokemonList";
import { fetchPokemons } from "@/core/server/actions/fetchPokemon";

export default async function Home() {
  const pokemons = await fetchPokemons();

  return <PokemonList pokemons={pokemons} />;
}