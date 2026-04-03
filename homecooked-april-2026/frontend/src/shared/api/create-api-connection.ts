/*
* Lightweight API client abstraction used for this POC.
* Centralizes request logic like headers, params, and error handling.
*
* While this project could work with direct fetch calls,
* this abstraction demonstrates how the API layer can scale
* and remain consistent as the application grows.
*
@usage

const api = createApi({
	baseUrl: 'https://api.example.com',
	headers: {
		Authorization: 'Bearer ' + process.env.API_TOKEN
	}
})
*/

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type Config = {
	baseUrl: string
	headers?: Record<string, string>
}

type Opts<TBody = unknown> = {
	body?: TBody
	params?: Record<string, string | number>
	headers?: Record<string, string>
	cache?: RequestCache
	next?: NextFetchRequestConfig
}

async function send<TRes, TBody = unknown>(
	config: Config,
	method: Method,
	path: string,
	options: Opts<TBody> = {}
): Promise<TRes> {
	const url = new URL(path, config.baseUrl)

	if (options.params) {
		for (const [k, v] of Object.entries(options.params)) {
			url.searchParams.set(k, String(v))
		}
	}

	const res = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...config.headers,
			...options.headers
		},
		body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
		cache: options.cache,
		next: options.next
	})

	if (!res.ok) {
		const text = await res.text()
		throw new Error(`${method} ${path} → ${res.status} ${text}`)
	}

	return res.json() as Promise<TRes>
}

export function createApi(config: Config) {
	return {
		get<TRes>(path: string, params?: Opts['params'], opts?: Omit<Opts, 'params'>) {
			return send<TRes>(config, 'GET', path, { ...opts, params })
		},

		post<TRes, TBody = unknown>(path: string, body?: TBody, opts?: Opts<TBody>) {
			return send<TRes, TBody>(config, 'POST', path, { ...opts, body })
		},

		patch<TRes, TBody = unknown>(path: string, body?: TBody, opts?: Opts<TBody>) {
			return send<TRes, TBody>(config, 'PATCH', path, { ...opts, body })
		},

		destroy<TRes>(path: string, opts?: Opts) {
			return send<TRes>(config, 'DELETE', path, opts)
		}
	}
}
