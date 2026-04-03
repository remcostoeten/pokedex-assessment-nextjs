import { beforeEach, describe, expect, it, vi } from 'vitest'

const { revalidateTag } = vi.hoisted(() => ({
	revalidateTag: vi.fn()
}))

const { capturePokemonMutation } = vi.hoisted(() => ({
	capturePokemonMutation: vi.fn()
}))

vi.mock('next/cache', () => ({
	revalidateTag
}))

vi.mock('../src/features/pokedex/mutations/capture-pokemon-mutation', () => ({
	capturePokemonMutation
}))

import { capturePokemonAction } from '../src/features/pokedex/actions/capture-pokemon-action'

describe('capturePokemonAction', () => {
	beforeEach(() => {
		revalidateTag.mockReset()
		capturePokemonMutation.mockReset()
	})

	it('completes when the mutation succeeds', async () => {
		capturePokemonMutation.mockResolvedValue({ ok: true, data: [] })

		await expect(capturePokemonAction(25)).resolves.toBeUndefined()
		expect(revalidateTag).not.toHaveBeenCalled()
	})

	it('treats an already caught response as an idempotent no-op', async () => {
		capturePokemonMutation.mockResolvedValue({
			ok: false,
			error: 'Pokemon already caught.'
		})

		await expect(capturePokemonAction(25)).resolves.toBeUndefined()
		expect(revalidateTag).toHaveBeenCalledWith('pokemon:pokedex', 'max')
	})

	it('throws for unexpected mutation failures', async () => {
		capturePokemonMutation.mockResolvedValue({
			ok: false,
			error: 'Service unavailable'
		})

		await expect(capturePokemonAction(25)).rejects.toThrow('Service unavailable')
		expect(revalidateTag).not.toHaveBeenCalled()
	})
})
