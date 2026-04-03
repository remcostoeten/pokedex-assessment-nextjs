'use server'

import { PokemonClient } from '@/features/pokedex/api/client'
import type { CaughtPokemon } from '@/features/pokedex/types'
import { createMutation } from '@/shared/create-mutation'

const releasePokemonMutation = createMutation<number, CaughtPokemon[]>(
    'pokemon:pokedex',
    (id) => PokemonClient().destroy(`/api/pokemon/${id}/pokedex`)
)

export async function releasePokemonAction(id: number) {
    const result = await releasePokemonMutation(id)

	if (!result.ok) {
		throw new Error(result.error)
	}
}
