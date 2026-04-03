export function PokemonSkeleton() {
	return (
		<div className="flex flex-col gap-3">
			{[...Array(12)].map((_, i) => (
				<div
					key={i}
					className="flex flex-col gap-4 rounded-base border border-border bg-surface px-4 py-4 shadow-card sm:flex-row sm:items-center sm:justify-between"
				>
					<div className="min-w-0 flex-1">
						<div className="flex items-center gap-3">
							<div className="h-4 w-28 animate-shimmer shimmer-gradient rounded-sm opacity-50" />
							<div className="h-3 w-12 animate-shimmer shimmer-gradient rounded-sm opacity-40" />
						</div>
						<div className="mt-2 h-3 w-24 animate-shimmer shimmer-gradient rounded-sm opacity-40" />
					</div>
					<div className="h-9 w-28 animate-shimmer shimmer-gradient rounded-md opacity-50" />
				</div>
			))}
		</div>
	)
}
