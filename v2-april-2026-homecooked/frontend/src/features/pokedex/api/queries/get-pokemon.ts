import { PokemonClient } from '@/features/pokedex/api/client'
import { isStaticPokedexDemo, readStaticDemoJson } from '@/features/pokedex/lib/static-demo'
import type { TPokemon } from '@/features/pokedex/types'
import { createQuery } from '@/shared/create-query'

export const getPokemon = createQuery<TPokemon[]>(() => {
	if (isStaticPokedexDemo()) {
		return readStaticDemoJson<TPokemon[]>('api/pokemon.json')
	}

	return PokemonClient().get(
		'/api/pokemon',
		{},
		{
			next: {
				tags: ['pokemon:list'],
				revalidate: 3600
			}
		}
	)
})
