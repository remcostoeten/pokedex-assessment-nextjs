'use server'

import { capturePokemonMutation } from '@/features/pokedex/mutations/capture-pokemon-mutation'

export async function capturePokemonAction(id: number) {
	const result = await capturePokemonMutation(id)

	if (!result.ok) {
		throw new Error(result.error)
	}
}
