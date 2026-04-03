import { beforeEach, describe, expect, it, vi } from 'vitest'

const { capturePokemonMutation } = vi.hoisted(() => ({
	capturePokemonMutation: vi.fn()
}))

vi.mock('../src/features/pokedex/mutations/capture-pokemon-mutation', () => ({
	capturePokemonMutation
}))

import { capturePokemonAction } from '../src/features/pokedex/actions/capture-pokemon-action'

describe('capturePokemonAction', () => {
	beforeEach(() => {
		capturePokemonMutation.mockReset()
	})

	it('completes when the mutation succeeds', async () => {
		capturePokemonMutation.mockResolvedValue({ ok: true, data: [] })

		await expect(capturePokemonAction(25)).resolves.toBeUndefined()
	})

	it('throws for unexpected mutation failures', async () => {
		capturePokemonMutation.mockResolvedValue({
			ok: false,
			error: 'Service unavailable'
		})

		await expect(capturePokemonAction(25)).rejects.toThrow('Service unavailable')
	})
})
