import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactCompiler: true,
	cacheComponents: true,
	turbopack: {
		root: import.meta.dirname
	}
}

export default nextConfig
