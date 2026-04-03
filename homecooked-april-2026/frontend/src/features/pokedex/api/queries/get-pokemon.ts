import { PokemonClient } from '@/features/pokedex/api/client'
import type { Pokemon } from '@/features/pokedex/types'
import { createQuery } from '@/shared/create-query'

export const getPokemon = createQuery<Pokemon[]>(() =>
	PokemonClient().get(
		'/api/pokemon',
		{},
		{
			next: {
				tags: ['pokemon:list'],
				revalidate: 3600
			}
		}
	)
)
