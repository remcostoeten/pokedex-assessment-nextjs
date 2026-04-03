import { PokemonClient } from '@/features/pokedex/api/client'
import type { CaughtPokemon } from '@/features/pokedex/types'
import { createQuery } from '@/shared/create-query'

// for deployment showcase w/o having to deploy a back-end i might do something like
// if (process.env  ==== 'production') { useStaticJson }

export const getPokedex = createQuery<CaughtPokemon[]>(() =>
	PokemonClient().get('/api/pokemon/pokedex', {}, {
		next: {
			tags: ['pokemon:pokedex']
		}
	})
)