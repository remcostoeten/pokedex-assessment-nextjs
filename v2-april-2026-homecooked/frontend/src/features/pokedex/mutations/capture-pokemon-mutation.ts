import { PokemonClient } from '@/features/pokedex/api/client'
import type { CaughtPokemon } from '@/features/pokedex/types'
import { createMutation } from '@/shared/create-mutation'

export const capturePokemonMutation = createMutation<number, CaughtPokemon[]>(
	'pokemon:pokedex',
	(id) => PokemonClient().post(`/api/pokemon/${id}/pokedex`)
)
