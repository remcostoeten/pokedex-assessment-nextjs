import { describe, it, expect } from 'vitest'

describe('sample tests', () => {
	it('should pass basic assertion', () => {
		expect(1 + 1).toBe(2)
	})

	it('should handle strings', () => {
		expect('hello'.toUpperCase()).toBe('HELLO')
	})
})
