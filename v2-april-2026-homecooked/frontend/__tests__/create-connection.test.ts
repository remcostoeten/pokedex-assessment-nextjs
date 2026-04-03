import { describe, it, expect, vi, beforeEach } from 'vitest'

import { createApi } from '../src/shared/api/create-api-connection'

describe('createApi', () => {
	const baseUrl = 'http://api.test'
	const api = createApi({ baseUrl })

	beforeEach(() => {
		vi.stubGlobal('fetch', vi.fn())
	})

	it('should handle successful requests and errors', async () => {
		const mockData = { id: 1 }
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => mockData
		} as Response)

		const result = await api.get('/data', { q: 'test' })
		expect(result).toEqual(mockData)
		expect(vi.mocked(fetch).mock.calls[0][0].toString()).toContain('q=test')

		vi.mocked(fetch).mockResolvedValueOnce({
			ok: false,
			status: 500,
			text: async () => 'Server Error'
		} as Response)

		await expect(api.get('/error')).rejects.toThrow('500')
	})
})
