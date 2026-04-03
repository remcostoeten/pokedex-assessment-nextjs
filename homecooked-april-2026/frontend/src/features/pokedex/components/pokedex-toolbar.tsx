export type PokedexFilter = 'all' | 'caught' | 'uncaught'
export type PokedexSortMode = 'default' | 'caught-first'

type PokedexToolbarProps = {
	capturedCount: number
	totalCount: number
	remainingCount: number
	completion: number
	filter: PokedexFilter
	onFilterChange: (filter: PokedexFilter) => void
	sortMode: PokedexSortMode
	onSortModeChange: (sortMode: PokedexSortMode) => void
}

export function PokedexToolbar({
	capturedCount,
	totalCount,
	remainingCount,
	completion,
	filter,
	onFilterChange,
	sortMode,
	onSortModeChange
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

			<div className="mt-4 inline-flex w-fit rounded-md border border-border bg-surface-elevated p-1">
				{(['all', 'caught', 'uncaught'] as const).map((option) => {
					const isActive = option === filter

					return (
						<button
							key={option}
							type="button"
							onClick={() => onFilterChange(option)}
							className={`rounded-sm px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
								isActive
									? 'bg-surface-hover text-foreground'
									: 'text-foreground-muted hover:text-foreground'
							}`}
						>
							{option}
						</button>
					)
				})}
			</div>

			<div className="mt-3 inline-flex w-fit rounded-md border border-border bg-surface-elevated p-1">
				{(
					[
						['default', 'Original'],
						['caught-first', 'Caught first']
					] as const satisfies ReadonlyArray<readonly [PokedexSortMode, string]>
				).map(([option, label]) => {
					const isActive = option === sortMode

					return (
						<button
							key={option}
							type="button"
							onClick={() => onSortModeChange(option)}
							className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors ${
								isActive
									? 'bg-surface-hover text-foreground'
									: 'text-foreground-muted hover:text-foreground'
							}`}
						>
							{label}
						</button>
					)
				})}
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
