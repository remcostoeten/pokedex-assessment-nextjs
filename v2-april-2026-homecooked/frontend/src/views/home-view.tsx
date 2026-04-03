import { PokemonFeed } from '@/features/pokedex/components/pokemon-feed'

export function PokedexView() {
	return (
		<div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
			<main className="mx-auto flex w-full max-w-4xl flex-col">
				<header className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-foreground-muted">
					<span>Remco Stoeten</span>
					<a
						href="https://github.com/remcostoeten/acme-test-pokemon-dotnet-api-interview-assesment/tree/v2"
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
					>
						GitHub Repo
						<span aria-hidden="true">↗</span>
					</a>
				</header>
				<PokemonFeed />
			</main>
		</div>
	)
}
