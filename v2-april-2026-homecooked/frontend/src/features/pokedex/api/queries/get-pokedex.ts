import { PokemonClient } from '@/features/pokedex/api/client'
import { isStaticPokedexDemo, readStaticDemoJson } from '@/features/pokedex/lib/static-demo'
import type { CaughtPokemon } from '@/features/pokedex/types'
import { createQuery } from '@/shared/create-query'

export const getPokedex = createQuery<CaughtPokemon[]>(() => {
	if (isStaticPokedexDemo()) {
		return readStaticDemoJson<CaughtPokemon[]>('api/pokedex.json')
	}

	return PokemonClient().get('/api/pokemon/pokedex', {}, {
		next: {
			tags: ['pokemon:pokedex']
		}
	})
})
