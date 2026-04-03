import { getPokemon } from "@/features/pokedex/api/queries/get-pokemon";

export async function PokedexView() {
  const pokemon = await getPokemon();

  return (
    <div className="min-h-screen p-6">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <pre className="overflow-x-auto rounded-[16px] border border-border bg-surface p-4 text-sm">
          {JSON.stringify(pokemon, null, 2)}
        </pre>
      </main>
    </div>
  );
}
