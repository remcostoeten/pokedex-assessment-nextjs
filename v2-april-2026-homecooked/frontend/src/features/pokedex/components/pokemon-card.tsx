import Image from 'next/image'

import { getTypeColor } from '@/features/pokedex/lib/type-colors'
import type { Pokemon } from '@/features/pokedex/types'

function StatBar({
	name,
	value,
	primaryColor
}: {
	name: string
	value: number
	primaryColor: string
}) {
	const percentage = Math.min((value / 255) * 100, 100)
	const label = name
		.replace('special-attack', 'Sp. Atk')
		.replace('special-defense', 'Sp. Def')
		.replace('attack', 'ATK')
		.replace('defense', 'DEF')
		.replace('speed', 'SPD')
		.replace('hp', 'HP')

	return (
		<div className="grid grid-cols-[3rem_1fr_1.5rem] items-center gap-2">
			<span className="text-[10px] font-bold uppercase tracking-wider text-foreground-muted">
				{label}
			</span>
			<div className="h-1 rounded-full bg-surface-elevated overflow-hidden">
				<div
					className="h-full rounded-full transition-all duration-700 ease-out"
					style={{ width: `${percentage}%`, backgroundColor: primaryColor }}
				/>
			</div>
			<span className="text-right font-mono text-[11px] font-semibold text-foreground-muted">
				{value}
			</span>
		</div>
	)
}

function TypeBadge({ name }: { name: string }) {
	const colors = getTypeColor(name)
	return (
		<span
			className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm"
			style={{
				background: `linear-gradient(135deg, ${colors.gradient[0]}, ${colors.gradient[1]})`
			}}
		>
			{name}
		</span>
	)
}

type PokemonCardProps = {
	pokemon: Pokemon
	isCaught: boolean
	actions?: React.ReactNode
}

export function PokemonCard({ pokemon, isCaught, actions }: PokemonCardProps) {
	const primaryType = pokemon.types.find((t) => t.slot === 1)?.type.name ?? 'normal'
	const colors = getTypeColor(primaryType)

	return (
		<article
			className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-base border border-border bg-surface p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-border-hover hover:shadow-card-hover"
			id={`pokemon-card-${pokemon.id}`}
		>
			<div
				className="absolute inset-x-0 top-0 h-[120px] opacity-10 transition-opacity duration-200 pointer-events-none group-hover:opacity-15"
				style={{
					background: `linear-gradient(135deg, ${colors.gradient[0]}, ${colors.gradient[1]})`
				}}
			/>

			<div className="relative z-10 flex w-full items-center justify-between">
				<span className="font-mono text-[11px] font-semibold tracking-wider text-foreground-dim">
					#{String(pokemon.id).padStart(3, '0')}
				</span>
				{isCaught && (
					<span
						className="animate-pulse-slow text-success text-[10px]"
						title="In your Pokédex"
					>
						◆
					</span>
				)}
			</div>

			<div className="relative z-10 flex h-[120px] w-full items-center justify-center">
				{pokemon.sprites.front_default && (
					<Image
						src={pokemon.sprites.front_default}
						alt={pokemon.name}
						width={120}
						height={120}
						className="pixelated drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-transform duration-200"
						unoptimized
					/>
				)}
			</div>

			<h3 className="relative z-10 text-[1.1rem] font-bold capitalize tracking-tight text-foreground">
				{pokemon.name}
			</h3>

			<div className="relative z-10 flex gap-1.5">
				{pokemon.types
					.sort((a, b) => a.slot - b.slot)
					.map((t) => (
						<TypeBadge key={t.type.name} name={t.type.name} />
					))}
			</div>

			<div className="relative z-10 flex w-full flex-col gap-1">
				{pokemon.stats
					.slice()
					.reverse()
					.map((s) => (
						<StatBar
							key={s.stat.name}
							name={s.stat.name}
							value={s.base_stat}
							primaryColor={colors.gradient[0]}
						/>
					))}
			</div>

			<div className="relative z-10 text-[11px] text-foreground-dim">
				{(pokemon.weight / 10).toFixed(1)} kg
			</div>

			{actions && <div className="relative z-10 mt-1 w-full">{actions}</div>}
		</article>
	)
}
