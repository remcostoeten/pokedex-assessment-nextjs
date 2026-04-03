import pokedexJson from '@/features/pokedex/data/pokedex.json'
import pokemonJson from '@/features/pokedex/data/pokemon.json'

export function isStaticPokedexDemo() {
    return process.env.NODE_ENV === 'production' && !process.env.POKEDEX_API_URL
}

export async function readStaticDemoJson<T>(relativePath: string): Promise<T> {
    switch (relativePath) {
        case 'api/pokedex.json':
            return pokedexJson as T
        case 'api/pokemon.json':
            return pokemonJson as T
        default:
            throw new Error(`Unsupported static demo dataset: ${relativePath}`)
    }
}
