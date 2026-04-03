import { PokemonClient } from '@/features/pokedex/api/client'
import { isStaticPokedexDemo, readStaticDemoJson } from '@/features/pokedex/lib/static-demo'
import type { TCaught } from '@/features/pokedex/types'
import { createQuery } from '@/shared/create-query'

export const getPokedex = createQuery<TCaught[]>(() => {
	if (isStaticPokedexDemo()) {
		return readStaticDemoJson<TCaught[]>('api/pokedex.json')
	}

	return PokemonClient().get(
		'/api/pokemon/pokedex',
		{},
		{
			next: {
				tags: ['pokemon:pokedex']
			}
		}
	)
})
