export interface PokemonStat {
	base_stat: number
	effort: number
	stat: {
		name: string
		url: string
	}
}

export interface PokemonType {
	slot: number
	type: {
		name: string
		url: string
	}
}

export interface Sprites {
	back_default: string | null
	back_female: string | null
	back_shiny: string | null
	back_shiny_female: string | null
	front_default: string | null
	front_female: string | null
	front_shiny: string | null
	front_shiny_female: string | null
}

export interface Pokemon {
	id: number
	name: string
	sprites: Sprites
	stats: PokemonStat[]
	types: PokemonType[]
	weight: number
}

export interface CaughtPokemon {
	id: number
	name: string
}
