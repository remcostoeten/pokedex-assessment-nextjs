'use server'

import type { CaughtPokemon } from '@/features/pokedex/types'
import { createMutation } from '@/shared/create-mutation'

import { PokemonClient } from '../api/client'

const releasePokemonMutation = createMutation<number, CaughtPokemon[]>('pokemon:pokedex', (id) =>
	PokemonClient().destroy(`/api/pokemon/${id}/pokedex`)
)

export async function releasePokemonAction(id: number) {
	const result = await releasePokemonMutation(id)

	if (!result.ok) {
		throw new Error(result.error)
	}
}
