import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const geistSans = Geist({
	subsets: ['latin'],
	variable: '--font-geist-sans'
})

const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-geist-mono'
})

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.className} ${geistMono.variable} antialiased`}
			suppressHydrationWarning
		>
			<body
				style={{
					backgroundColor: '#0c0c14',
					color: '#e8e8f0',
					margin: 0,
					minHeight: '100vh'
				}}
			>
				{children}
			</body>
		</html>
	)
}
