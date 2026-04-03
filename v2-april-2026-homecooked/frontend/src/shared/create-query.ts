/*
* A server abstraction to standardize server queries
* It handles the result type and caches the result

@usage

import { createQuery } from './create-query'
import { domainApi } from './create-connection'
const query = createQuery({
	fetcher: async () => {
		const result = await domainApi.get('/data')
		return result
	}
})
*/

export function createQuery<T>(fetcher: () => Promise<T>): () => Promise<T> {
	return async () => {
		return await fetcher()
	}
}
