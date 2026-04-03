'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'static-demo-modal-dismissed'
const README_URL =
	'https://github.com/remcostoeten/acme-test-pokemon-dotnet-api-interview-assesment/blob/v2/frontend/README.md'

type StaticDemoModalProps = {
	staticDemo: boolean
}

export function StaticDemoModal({ staticDemo }: StaticDemoModalProps) {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (!staticDemo) {
			return
		}

		if (window.sessionStorage.getItem(STORAGE_KEY) === 'true') {
			return
		}

		setIsOpen(true)
	}, [staticDemo])

	function handleClose() {
		window.sessionStorage.setItem(STORAGE_KEY, 'true')
		setIsOpen(false)
	}

	if (!staticDemo || !isOpen) {
		return null
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/72 px-4">
			<div className="w-full max-w-md rounded-base border border-border bg-surface p-5 shadow-card">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h2 className="text-base font-semibold text-foreground">Static demo mode</h2>
						<p className="mt-2 text-sm leading-6 text-foreground-muted">
							This deployment runs from static JSON in <code>public/api</code>. Capture and
							release still work, but the Pokédex is stored in your browser instead of the
							.NET API.
						</p>
					</div>

					<button
						type="button"
						onClick={handleClose}
						className="rounded-sm border border-border px-2 py-1 text-xs text-foreground-muted transition-colors hover:border-border-hover hover:text-foreground"
						aria-label="Close static demo explanation"
					>
						Close
					</button>
				</div>

				<div className="mt-4 flex items-center justify-between gap-3">
					<Link
						href={README_URL}
						target="_blank"
						rel="noreferrer"
						className="text-sm font-medium text-foreground underline underline-offset-4 transition-colors hover:text-foreground-muted"
					>
						Read the README
					</Link>

					<button
						type="button"
						onClick={handleClose}
						className="rounded-md border border-border-hover bg-surface-elevated px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
					>
						Continue
					</button>
				</div>
			</div>
		</div>
	)
}
