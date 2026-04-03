type PokedexToolbarProps = {
	capturedCount: number
	totalCount: number
	remainingCount: number
	completion: number
}

export function PokedexToolbar({
	capturedCount,
	totalCount,
	remainingCount,
	completion
}: PokedexToolbarProps) {
	return (
		<section className="rounded-base border border-border bg-surface px-4 py-4 shadow-card">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div className="flex items-baseline gap-3">
					<span className="text-2xl font-semibold text-foreground">
						{capturedCount}/{totalCount}
					</span>
					<span className="text-sm text-foreground-muted">captured</span>
				</div>

				<div className="flex gap-4 text-sm text-foreground-muted">
					<span>{remainingCount} remaining</span>
					<span>{completion}% complete</span>
				</div>
			</div>

			<div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-elevated">
				<div
					className="h-full rounded-full bg-foreground transition-[width] duration-300"
					style={{ width: `${completion}%` }}
				/>
			</div>
		</section>
	)
}
