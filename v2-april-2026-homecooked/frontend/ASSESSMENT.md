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

This is a toned-down version of how I usually structure applications:

- Anything reused across features goes into `shared`.
- Feature logic is co-located in `features`. I prefer this over a flat structure because UI, API access, and related actions stay grouped by concern.
- API access is wrapped in a small abstraction layer. In this project that is `create-api-connection`, plus minimal `create-mutation.ts`, `create-query.ts`, and action wrappers. Here they mainly provide structure and consistency, but in a larger application this layer would usually also handle retries, aborting, timeouts, and similar concerns.
- The UI updates optimistically so interactions feel immediate.
- Mutations are server actions prefixed with `'use server'`, which prevents them from executing on the client, while queries and GET requests remain strictly server-side functions. One could also query within server actions, but those are always POST requests.

### Notes

- I kept the solution intentionally lightweight and minimal in dependencies.
- The tests focus on the most important shared logic and the capture and release action flow.
- With more time, I would add a broader showcase of the Pokemon API and improve interactivity through `{id}` pages, better filtering, search, animations, and so forth.

Kind regards,

Remco Stoeten
