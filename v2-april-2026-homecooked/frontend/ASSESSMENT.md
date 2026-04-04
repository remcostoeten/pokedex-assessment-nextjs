## Pokedex Assessment

A small proof-of-concept app that covers the requested Pokemon overview, capture flow, and captured Pokemon management.

### Tech

- Next.js
- TypeScript
- Tailwind CSS v4
- Vitest
- Oxfmt / oxlint (a fast linter and formatter)

No additional runtime packages were installed.

### Architecture

I kept the architecture intentionally small, but still separated concerns by ownership:

- Server-side responsibilities stay server-side. Data fetching and mutation wiring happen on the server, while the interactive list is a client component that only owns transient UI state such as filtering, optimistic updates, pending state, and the static demo fallback.
- Feature logic is co-located in `features`, while generic helpers live in `shared`. The folder name could just as well be `domains` or `modules`; the point is to group UI, API access, and actions by business concern instead of by file type. In a larger application, these feature areas can also grow into nested sub-features when a domain becomes large enough to justify another boundary.
- API access is wrapped in a small abstraction layer. In this project that is `create-api-connection`, together with minimal `create-mutation.ts`, `create-query.ts`, and action wrappers. Here that layer mainly provides consistency, but in a larger application it would also be the natural place for retries, aborting, timeouts, and similar concerns.
- The capture and release flows use optimistic UI updates so the interface responds immediately, then reconcile with the server if a mutation fails. I kept that implementation explicit instead of introducing `useOptimistic`, because the mutation flow is still small and the rollback path is straightforward.
- Mutations are implemented as server actions with `'use server'`, which keeps write operations off the client. Queries and GET requests remain server-side functions, which keeps the data boundary explicit.

### Notes

- I kept the solution intentionally lightweight and minimal in dependencies.
- I avoided adding framework features purely for optics. For example, `useTransition` is a reasonable tool when an interface has a real render-priority problem, but I did not introduce it here because the current interactions do not justify the added complexity.
- The tests focus on the most important shared logic and the capture and release action flow.
- With more time, I would add a broader showcase of the Pokemon API and improve interactivity through `{id}` pages, better filtering, search, animations, and so forth.

Kind regards,

Remco Stoeten
