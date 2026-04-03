import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactCompiler: true,
	experimental: {
		cacheComponents: true
	}
}

export default nextConfig
