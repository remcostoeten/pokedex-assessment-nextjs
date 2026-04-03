import { POKEMON_API_URL } from "@/core/config";

export async function fetchPokemons() {
  const res = await fetch(POKEMON_API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon");
  }
  return res.json();
}
