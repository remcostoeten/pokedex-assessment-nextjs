import { Suspense } from 'react'

import { PokemonFeed } from '@/features/pokedex/components/pokemon-feed'
import { PokemonSkeleton } from '@/features/pokedex/components/pokemon-skeleton'

export function PokedexView() {
	return (
		<div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
			<main className="mx-auto flex w-full max-w-4xl flex-col">
				<Suspense fallback={<PokemonSkeleton />}>
					<PokemonFeed />
				</Suspense>
			</main>
		</div>
	)
}
