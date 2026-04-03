'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
	PokedexToolbar,
	type PokedexFilter,
	type PokedexSortMode
} from '@/features/pokedex/components/pokedex-toolbar'
import { StaticDemoModal } from '@/features/pokedex/components/static-demo-modal'
import type { Pokemon, CaughtPokemon } from '@/features/pokedex/types'

type PokemonListProps = {
	pokemon: Pokemon[]
	pokedex: CaughtPokemon[]
	capturePokemon: (id: number) => Promise<void>
	releasePokemon: (id: number) => Promise<void>
	staticDemo: boolean
}

export function PokemonList({
	pokemon,
	pokedex,
	capturePokemon,
	releasePokemon,
	staticDemo
}: PokemonListProps) {
	const router = useRouter()
	const [clientPokedex, setClientPokedex] = useState(pokedex)
	const [pendingPokemonId, setPendingPokemonId] = useState<number | null>(null)
	const [feedbackPokemonId, setFeedbackPokemonId] = useState<number | null>(null)
	const [filter, setFilter] = useState<PokedexFilter>('all')
	const [sortMode, setSortMode] = useState<PokedexSortMode>('caught-first')
	const caughtIds = new Set(clientPokedex.map((p) => p.id))
	const capturedCount = clientPokedex.length
	const totalCount = pokemon.length
	const remainingCount = totalCount - capturedCount
	const completion = totalCount === 0 ? 0 : Math.round((capturedCount / totalCount) * 100)

	useEffect(() => {
		if (staticDemo) {
			return
		}

		setClientPokedex(pokedex)
	}, [pokedex, staticDemo])

	useEffect(() => {
		if (!staticDemo) {
			return
		}

		const storedPokedex = window.localStorage.getItem('pokedex-demo')

		if (!storedPokedex) {
			return
		}

		try {
			setClientPokedex(JSON.parse(storedPokedex) as CaughtPokemon[])
		} catch {
			window.localStorage.removeItem('pokedex-demo')
		}
	}, [staticDemo])

	useEffect(() => {
		if (feedbackPokemonId === null) {
			return
		}

		const timeoutId = window.setTimeout(() => {
			setFeedbackPokemonId((currentId) =>
				currentId === feedbackPokemonId ? null : currentId
			)
		}, 360)

		return () => window.clearTimeout(timeoutId)
	}, [feedbackPokemonId])

	const sortedPokemon = pokemon.slice().sort((left, right) => {
		if (sortMode === 'caught-first') {
			const leftCaught = caughtIds.has(left.id)
			const rightCaught = caughtIds.has(right.id)

			if (leftCaught !== rightCaught) {
				return leftCaught ? -1 : 1
			}
		}

		return left.id - right.id
	})

	const visiblePokemon = sortedPokemon.filter((pokemonEntry) => {
		const isCaught = caughtIds.has(pokemonEntry.id)

		if (filter === 'caught') {
			return isCaught
		}

		if (filter === 'uncaught') {
			return !isCaught
		}

		return true
	})

	function handleFilterChange(nextFilter: PokedexFilter) {
		if (nextFilter === filter || pendingPokemonId !== null) {
			return
		}

		setFilter(nextFilter)
	}

	function handleSortModeChange(nextSortMode: PokedexSortMode) {
		if (nextSortMode === sortMode || pendingPokemonId !== null) {
			return
		}

		setSortMode(nextSortMode)
	}

	function handleCapture(p: Pokemon) {
		if (caughtIds.has(p.id) || pendingPokemonId !== null) {
			return
		}

		setFeedbackPokemonId(p.id)

		if (staticDemo) {
			const nextPokedex = [...clientPokedex, { id: p.id, name: p.name }]
			setClientPokedex(nextPokedex)
			window.localStorage.setItem('pokedex-demo', JSON.stringify(nextPokedex))
			return
		}

		setPendingPokemonId(p.id)

		setClientPokedex((currentPokedex) => [...currentPokedex, { id: p.id, name: p.name }])

		void capturePokemon(p.id)
			.catch((error) => {
				console.error(error)
				setClientPokedex((currentPokedex) =>
					currentPokedex.filter((pokemonEntry) => pokemonEntry.id !== p.id)
				)
				router.refresh()
			})
			.finally(() => {
				setPendingPokemonId((currentPendingId) =>
					currentPendingId === p.id ? null : currentPendingId
				)
			})
	}

	function handleRelease(id: number) {
		if (!caughtIds.has(id) || pendingPokemonId !== null) {
			return
		}

		const releasedPokemon = clientPokedex.find((pokemonEntry) => pokemonEntry.id === id)

		if (!releasedPokemon) {
			return
		}

		setFeedbackPokemonId(id)

		if (staticDemo) {
			const nextPokedex = clientPokedex.filter((pokemonEntry) => pokemonEntry.id !== id)
			setClientPokedex(nextPokedex)
			window.localStorage.setItem('pokedex-demo', JSON.stringify(nextPokedex))
			return
		}

		setPendingPokemonId(id)

		setClientPokedex((currentPokedex) =>
			currentPokedex.filter((pokemonEntry) => pokemonEntry.id !== id)
		)

		void releasePokemon(id)
			.catch((error) => {
				console.error(error)
				setClientPokedex((currentPokedex) => [...currentPokedex, releasedPokemon])
				router.refresh()
			})
			.finally(() => {
				setPendingPokemonId((currentPendingId) =>
					currentPendingId === id ? null : currentPendingId
				)
			})
	}

	return (
		<div className="flex flex-col gap-3">
			<StaticDemoModal staticDemo={staticDemo} />

			<PokedexToolbar
				capturedCount={capturedCount}
				totalCount={totalCount}
				remainingCount={remainingCount}
				completion={completion}
				filter={filter}
				onFilterChange={handleFilterChange}
				sortMode={sortMode}
				onSortModeChange={handleSortModeChange}
			/>

			<ul className="flex flex-col gap-3">
				{visiblePokemon.map((p) => {
					const isCaught = caughtIds.has(p.id)
					const isPending = pendingPokemonId === p.id
					const hasFeedback = feedbackPokemonId === p.id
					const typeNames = p.types
						.slice()
						.sort((a, b) => a.slot - b.slot)
						.map((type) => type.type.name)
						.join(' • ')

					return (
						<li
							key={p.id}
							className={`flex flex-col gap-4 rounded-base border border-border bg-surface px-4 py-4 shadow-card transition-opacity sm:flex-row sm:items-center sm:justify-between ${
								isPending ? 'opacity-70' : ''
							} ${hasFeedback ? 'animate-feedback-flash' : ''}`}
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
								className={`min-w-28 rounded-md border px-3 py-2 text-sm font-medium transition-[transform,colors,box-shadow] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 ${
									isCaught
										? 'border-danger/20 bg-danger/8 text-danger hover:bg-danger/12'
										: 'border-border-hover bg-surface-elevated text-foreground hover:bg-surface-hover'
								}`}
								onClick={() => (isCaught ? handleRelease(p.id) : handleCapture(p))}
								disabled={isPending}
								aria-busy={isPending}
								id={`action-${p.id}`}
							>
								{isPending
									? isCaught
										? 'Releasing...'
										: 'Capturing...'
									: isCaught
										? 'Release'
										: 'Capture'}
							</button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
