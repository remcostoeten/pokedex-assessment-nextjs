import { capturePokemonAction } from '@/features/pokedex/actions/capture-pokemon-action'
import { releasePokemonAction } from '@/features/pokedex/actions/release-pokemon-action'
import { getPokedex } from '@/features/pokedex/api/queries/get-pokedex'
import { getPokemon } from '@/features/pokedex/api/queries/get-pokemon'
import { PokemonList } from '@/features/pokedex/components/pokemon-list'
import { isStaticPokedexDemo } from '@/features/pokedex/lib/static-demo'

export async function PokemonFeed() {
	const [pokemon, pokedex] = await Promise.all([getPokemon(), getPokedex()])

	return (
		<PokemonList
			pokemon={pokemon}
			pokedex={pokedex}
			capturePokemon={capturePokemonAction}
			releasePokemon={releasePokemonAction}
			staticDemo={isStaticPokedexDemo()}
		/>
	)
}
