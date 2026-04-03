'use client'

import { useRouter } from 'next/navigation'
import { useOptimistic, useRef, useTransition } from 'react'

import { PokedexToolbar } from '@/features/pokedex/components/pokedex-toolbar'
import type { Pokemon, CaughtPokemon } from '@/features/pokedex/types'

type PokemonListProps = {
	pokemon: Pokemon[]
	pokedex: CaughtPokemon[]
	capturePokemon: (id: number) => Promise<void>
	releasePokemon: (id: number) => Promise<void>
}

export function PokemonList({
	pokemon,
	pokedex,
	capturePokemon,
	releasePokemon
}: PokemonListProps) {
	const router = useRouter()
	const refreshTimeoutRef = useRef<number | null>(null)
	const [optimisticPokedex, setOptimisticPokedex] = useOptimistic<
		CaughtPokemon[],
		{ type: 'capture' | 'release'; pokemonId: number; pokemonName?: string }
	>(pokedex, (state, action) => {
		if (action.type === 'capture') {
			return [...state, { id: action.pokemonId, name: action.pokemonName ?? '' }]
		} else {
			return state.filter((p) => p.id !== action.pokemonId)
		}
	})

	const [isPending, startTransition] = useTransition()
	const caughtIds = new Set(optimisticPokedex.map((p) => p.id))
	const capturedCount = optimisticPokedex.length
	const totalCount = pokemon.length
	const remainingCount = totalCount - capturedCount
	const completion = totalCount === 0 ? 0 : Math.round((capturedCount / totalCount) * 100)

	const handleCapture = (p: Pokemon) => {
		startTransition(async () => {
			setOptimisticPokedex({ type: 'capture', pokemonId: p.id, pokemonName: p.name })
			try {
				await capturePokemon(p.id)
			} catch (error) {
				console.error(error)
			} finally {
				if (refreshTimeoutRef.current !== null) {
					window.clearTimeout(refreshTimeoutRef.current)
				}

				refreshTimeoutRef.current = window.setTimeout(() => {
					router.refresh()
					refreshTimeoutRef.current = null
				}, 320)
			}
		})
	}

	const handleRelease = (id: number) => {
		startTransition(async () => {
			setOptimisticPokedex({ type: 'release', pokemonId: id })
			try {
				await releasePokemon(id)
			} catch (error) {
				console.error(error)
			} finally {
				if (refreshTimeoutRef.current !== null) {
					window.clearTimeout(refreshTimeoutRef.current)
				}

				refreshTimeoutRef.current = window.setTimeout(() => {
					router.refresh()
					refreshTimeoutRef.current = null
				}, 320)
			}
		})
	}

	return (
		<div className="flex flex-col gap-3">
			<PokedexToolbar
				capturedCount={capturedCount}
				totalCount={totalCount}
				remainingCount={remainingCount}
				completion={completion}
			/>

			<ul className="flex flex-col gap-3">
				{pokemon.map((p) => {
					const isCaught = caughtIds.has(p.id)
					const typeNames = p.types
						.slice()
						.sort((a, b) => a.slot - b.slot)
						.map((type) => type.type.name)
						.join(' • ')

					return (
						<li
							key={p.id}
							className="flex flex-col gap-4 rounded-base border border-border bg-surface px-4 py-4 shadow-card sm:flex-row sm:items-center sm:justify-between"
						>
							<div className="min-w-0">
								<div className="flex items-center gap-3">
									<h2 className="text-base font-semibold capitalize text-foreground">
										{p.name}
									</h2>
									<span className="font-mono text-xs text-foreground-muted">
										#{String(p.id).padStart(3, '0')}
									</span>
									{isCaught ? (
										<span className="rounded-full bg-success/12 px-2 py-1 text-[11px] font-medium text-success">
											Caught
										</span>
									) : null}
								</div>

								<p className="mt-1 text-sm text-foreground-muted">{typeNames}</p>
							</div>

							<button
								type="button"
								className={`min-w-28 rounded-md border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
									isCaught
										? 'border-danger/20 bg-danger/8 text-danger hover:bg-danger/12'
										: 'border-border-hover bg-surface-elevated text-foreground hover:bg-surface-hover'
								}`}
								onClick={() => (isCaught ? handleRelease(p.id) : handleCapture(p))}
								disabled={isPending}
								id={`action-${p.id}`}
							>
								{isCaught ? 'Release' : 'Capture'}
							</button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
