import { beforeEach, describe, expect, it, vi } from 'vitest'

const { releasePokemonMutation } = vi.hoisted(() => ({
	releasePokemonMutation: vi.fn()
}))

vi.mock('../src/features/pokedex/mutations/release-pokemon-mutation', () => ({
	releasePokemonMutation
}))

import { releasePokemonAction } from '../src/features/pokedex/actions/release-pokemon-action'

describe('releasePokemonAction', () => {
	beforeEach(() => {
		releasePokemonMutation.mockReset()
	})

	it('completes when the mutation succeeds', async () => {
		releasePokemonMutation.mockResolvedValue({ ok: true, data: [] })

		await expect(releasePokemonAction(25)).resolves.toBeUndefined()
	})

	it('throws when the mutation fails', async () => {
		releasePokemonMutation.mockResolvedValue({
			ok: false,
			error: 'DELETE /api/pokemon/25/pokedex → 404 '
		})

		await expect(releasePokemonAction(25)).rejects.toThrow(
			'DELETE /api/pokemon/25/pokedex → 404 '
		)
	})
})
