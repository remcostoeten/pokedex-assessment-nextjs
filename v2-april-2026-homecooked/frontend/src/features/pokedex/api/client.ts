import { createApi } from '@/shared/api/create-api-connection'

export function PokemonClient() {
	return createApi({
		baseUrl: process.env.POKEDEX_API_URL ?? 'http://127.0.0.1:5000'
	})
}
