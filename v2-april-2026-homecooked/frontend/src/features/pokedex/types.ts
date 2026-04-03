export interface TPokemon {
	id: number
	name: string
	stats: {
		base_stat: number
		effort: number
		stat: {
			name: string
			url: string
		}
	}[]
	types: {
		slot: number
		type: {
			name: string
			url: string
		}
	}[]
	weight: number
}

export interface TCaught {
	id: number
	name: string
}
