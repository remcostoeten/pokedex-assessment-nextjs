import { describe, expect, it, vi } from 'vitest'

import { createQuery } from '../src/shared/create-query'

describe('createQuery', () => {
	it('returns a function that runs the fetcher and resolves the result', async () => {
		const mockData = { test: 'data' }
		const fetcher = vi.fn().mockResolvedValue(mockData)

		const query = createQuery(fetcher)
		const result = await query()

		expect(fetcher).toHaveBeenCalledTimes(1)
		expect(result).toEqual(mockData)
	})

	it('propagates errors from the fetcher', async () => {
		const error = new Error('Fetch failed')
		const fetcher = vi.fn().mockRejectedValue(error)

		const query = createQuery(fetcher)

		await expect(query()).rejects.toThrow('Fetch failed')
	})
})
