import { Suspense } from 'react'

import { PokemonFeed } from '@/features/pokedex/components/pokemon-feed'
import { PokemonSkeleton } from '@/features/pokedex/components/pokemon-skeleton'

export function PokedexView() {
    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <main className="mx-auto flex w-full max-w-4xl flex-col">
                <header className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-foreground-muted">
                    <span>Remco Stoeten</span>
                    <a
                        href="https://github.com/remcostoeten"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-foreground"
                    >
                        GitHub
                    </a>
                </header>
                <Suspense fallback={<PokemonSkeleton />}>
                    <PokemonFeed />
                </Suspense>
            </main>
        </div>
	)
}
