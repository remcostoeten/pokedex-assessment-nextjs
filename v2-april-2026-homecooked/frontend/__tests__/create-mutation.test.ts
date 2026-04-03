import { beforeEach, describe, expect, it, vi } from 'vitest'

const { revalidateTag } = vi.hoisted(() => ({
	revalidateTag: vi.fn()
}))

vi.mock('next/cache', () => ({
	revalidateTag
}))

import { createMutation } from '../src/shared/create-mutation'

describe('createMutation', () => {
	beforeEach(() => {
		revalidateTag.mockReset()
	})

	it('returns action data and revalidates every provided tag', async () => {
		const action = vi.fn().mockResolvedValue({ id: 25 })
		const mutation = createMutation<number, { id: number }>(
			['pokemon:list', 'pokemon:pokedex'],
			action
		)

		const result = await mutation(25)

		expect(action).toHaveBeenCalledWith(25)
		expect(result).toEqual({ ok: true, data: { id: 25 } })
		expect(revalidateTag).toHaveBeenCalledTimes(2)
		expect(revalidateTag).toHaveBeenNthCalledWith(1, 'pokemon:list', 'max')
		expect(revalidateTag).toHaveBeenNthCalledWith(2, 'pokemon:pokedex', 'max')
	})

	it('returns a normalized error and skips revalidation when the action fails', async () => {
		const action = vi.fn().mockRejectedValue(new Error('Capture failed'))
		const mutation = createMutation<number, { id: number }>('pokemon:pokedex', action)

		const result = await mutation(25)

		expect(result).toEqual({ ok: false, error: 'Capture failed' })
		expect(revalidateTag).not.toHaveBeenCalled()
	})
})
