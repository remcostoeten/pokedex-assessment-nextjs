import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mutationSpy } = vi.hoisted(() => ({
	mutationSpy: vi.fn()
}))

vi.mock('../src/shared/create-mutation', () => ({
	createMutation: vi.fn(() => mutationSpy)
}))

import { capturePokemonAction } from '../src/features/pokedex/actions/capture-pokemon-action'

describe('capturePokemonAction', () => {
	beforeEach(() => {
		mutationSpy.mockReset()
	})

	it('completes when the mutation succeeds', async () => {
		mutationSpy.mockResolvedValue({ ok: true, data: [] })

		await expect(capturePokemonAction(25)).resolves.toBeUndefined()
	})

	it('throws for unexpected mutation failures', async () => {
		mutationSpy.mockResolvedValue({
			ok: false,
			error: 'Service unavailable'
		})

		await expect(capturePokemonAction(25)).rejects.toThrow('Service unavailable')
	})
})
