'use server'

import { PokemonClient } from '@/features/pokedex/api/client'
import type { TCaught } from '@/features/pokedex/types'
import { createMutation } from '@/shared/create-mutation'

const capturePokemonMutation = createMutation<number, TCaught[]>('pokemon:pokedex', (id) =>
	PokemonClient().post(`/api/pokemon/${id}/pokedex`)
)

export async function capturePokemonAction(id: number) {
	const result = await capturePokemonMutation(id)

	if (!result.ok) {
		throw new Error(result.error)
	}
}
