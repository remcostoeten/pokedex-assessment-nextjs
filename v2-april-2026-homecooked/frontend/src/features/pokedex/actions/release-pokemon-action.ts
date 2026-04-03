'use server'

import { releasePokemonMutation } from '@/features/pokedex/mutations/release-pokemon-mutation'

export async function releasePokemonAction(id: number) {
	const result = await releasePokemonMutation(id)

	if (!result.ok) {
		throw new Error(result.error)
	}
}
