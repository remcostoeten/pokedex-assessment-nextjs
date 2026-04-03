import { readFile } from 'node:fs/promises'
import path from 'node:path'

export function isStaticPokedexDemo() {
	return process.env.NODE_ENV === 'production' && !process.env.POKEDEX_API_URL
}

export async function readStaticDemoJson<T>(relativePath: string): Promise<T> {
	const absolutePath = path.join(process.cwd(), 'public', relativePath)
	const fileContents = await readFile(absolutePath, 'utf8')

	return JSON.parse(fileContents) as T
}
