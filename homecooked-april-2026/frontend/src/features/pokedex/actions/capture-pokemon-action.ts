'use server'

import { revalidateTag } from 'next/cache'

import { capturePokemonMutation } from '@/features/pokedex/mutations/capture-pokemon-mutation'

export async function capturePokemonAction(id: number) {
	const result = await capturePokemonMutation(id)

	if (!result.ok) {
		if (result.error.toLowerCase().includes('already caught')) {
			revalidateTag('pokemon:pokedex', 'max')
			return
		}

		throw new Error(result.error)
	}
}
