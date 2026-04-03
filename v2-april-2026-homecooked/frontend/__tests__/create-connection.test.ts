import { describe, it, expect, vi, beforeEach } from 'vitest'

import { createApi } from '../src/shared/api/create-api-connection'

describe('createApi', () => {
	const baseUrl = 'http://api.test'
	const api = createApi({ baseUrl })
	let fetchMock: ReturnType<typeof vi.fn>

	beforeEach(() => {
		fetchMock = vi.fn()
		globalThis.fetch = fetchMock as typeof fetch
	})

	it('should handle successful requests and errors', async () => {
		const mockData = { id: 1 }
		fetchMock.mockResolvedValueOnce({
			ok: true,
			json: async () => mockData
		} as Response)

		const result = await api.get('/data', { q: 'test' })
		expect(result).toEqual(mockData)
		expect(fetchMock.mock.calls[0][0].toString()).toContain('q=test')

		fetchMock.mockResolvedValueOnce({
			ok: false,
			status: 500,
			text: async () => 'Server Error'
		} as Response)

		await expect(api.get('/error')).rejects.toThrow('500')
	})
})
