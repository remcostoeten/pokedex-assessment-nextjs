import { beforeEach, describe, expect, it, vi } from 'vitest'

var mutationSpy = vi.fn()

vi.mock('../src/shared/create-mutation', () => ({
	createMutation: vi.fn(
		() =>
			(...args: Parameters<typeof mutationSpy>) =>
				mutationSpy(...args)
	)
}))

import { releasePokemonAction } from '../src/features/pokedex/actions/release-pokemon-action'

describe('releasePokemonAction', () => {
	beforeEach(() => {
		mutationSpy.mockReset()
	})

	it('completes when the mutation succeeds', async () => {
		mutationSpy.mockResolvedValue({ ok: true, data: [] })

		await expect(releasePokemonAction(25)).resolves.toBeUndefined()
	})

	it('throws when the mutation fails', async () => {
		mutationSpy.mockResolvedValue({
			ok: false,
			error: 'DELETE /api/pokemon/25/pokedex → 404 '
		})

		await expect(releasePokemonAction(25)).rejects.toThrow(
			'DELETE /api/pokemon/25/pokedex → 404 '
		)
	})
})
