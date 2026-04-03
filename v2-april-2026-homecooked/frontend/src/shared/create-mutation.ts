/*
* Standardizes server mutations by wrapping the action result
* and invalidating one or more cache tags after success.
*
@usage

import { createMutation } from './create-mutation'
import { domainApi } from './create-connection'

const mutation = createMutation(['data'], async (input: string) => {
	const result = await domainApi.post('/data', input)
	return result
})
*/

import { revalidateTag } from 'next/cache'

import type { ActionResult } from './api/types'

export function createMutation<TInput, TOutput>(
	invalidates: string | string[],
	action: (input: TInput) => Promise<TOutput>
) {
	return async (input: TInput): Promise<ActionResult<TOutput>> => {
		try {
			const data = await action(input)

			const tags = Array.isArray(invalidates) ? invalidates : [invalidates]
			for (const tag of tags) {
				revalidateTag(tag, 'max')
			}

			return { ok: true, data }
		} catch (error) {
			return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' }
		}
	}
}
