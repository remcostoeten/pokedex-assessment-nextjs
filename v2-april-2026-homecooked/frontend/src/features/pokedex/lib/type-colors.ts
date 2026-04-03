/**
 * Curated pokémon-type color palette.
 * Each type gets a vibrant gradient pair and a soft background tint.
 */
export const TYPE_COLORS: Record<string, { gradient: [string, string]; bg: string; text: string }> =
	{
		normal: {
			gradient: ['#a8a878', '#c6c6a7'],
			bg: 'rgba(168,168,120,0.15)',
			text: '#6d6d4e'
		},
		fire: {
			gradient: ['#f08030', '#f5ac78'],
			bg: 'rgba(240,128,48,0.15)',
			text: '#9c531f'
		},
		water: {
			gradient: ['#6890f0', '#9db7f5'],
			bg: 'rgba(104,144,240,0.15)',
			text: '#445e9c'
		},
		electric: {
			gradient: ['#f8d030', '#fae078'],
			bg: 'rgba(248,208,48,0.15)',
			text: '#a1871f'
		},
		grass: {
			gradient: ['#78c850', '#a7db8d'],
			bg: 'rgba(120,200,80,0.15)',
			text: '#4e8234'
		},
		ice: {
			gradient: ['#98d8d8', '#bce6e6'],
			bg: 'rgba(152,216,216,0.15)',
			text: '#638d8d'
		},
		fighting: {
			gradient: ['#c03028', '#d67873'],
			bg: 'rgba(192,48,40,0.15)',
			text: '#7d1f1a'
		},
		poison: {
			gradient: ['#a040a0', '#c183c1'],
			bg: 'rgba(160,64,160,0.15)',
			text: '#682a68'
		},
		ground: {
			gradient: ['#e0c068', '#ebd69d'],
			bg: 'rgba(224,192,104,0.15)',
			text: '#927d44'
		},
		flying: {
			gradient: ['#a890f0', '#c6b7f5'],
			bg: 'rgba(168,144,240,0.15)',
			text: '#6d5e9c'
		},
		psychic: {
			gradient: ['#f85888', '#fa92b2'],
			bg: 'rgba(248,88,136,0.15)',
			text: '#a13959'
		},
		bug: {
			gradient: ['#a8b820', '#c6d16d'],
			bg: 'rgba(168,184,32,0.15)',
			text: '#6d7815'
		},
		rock: {
			gradient: ['#b8a038', '#d1c17d'],
			bg: 'rgba(184,160,56,0.15)',
			text: '#786824'
		},
		ghost: {
			gradient: ['#705898', '#a292bc'],
			bg: 'rgba(112,88,152,0.15)',
			text: '#493963'
		},
		dragon: {
			gradient: ['#7038f8', '#a27dfa'],
			bg: 'rgba(112,56,248,0.15)',
			text: '#4924a1'
		},
		dark: {
			gradient: ['#705848', '#a29288'],
			bg: 'rgba(112,88,72,0.15)',
			text: '#49392f'
		},
		steel: {
			gradient: ['#b8b8d0', '#d1d1e0'],
			bg: 'rgba(184,184,208,0.15)',
			text: '#787887'
		},
		fairy: {
			gradient: ['#ee99ac', '#f4bdc9'],
			bg: 'rgba(238,153,172,0.15)',
			text: '#9b6470'
		}
	}

export function getTypeColor(typeName: string) {
	return (
		TYPE_COLORS[typeName.toLowerCase()] ?? {
			gradient: ['#68a090', '#8fc4b4'] as [string, string],
			bg: 'rgba(104,160,144,0.15)',
			text: '#44685e'
		}
	)
}
