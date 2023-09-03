import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'
import { Navigation } from '@/app/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Cabalytics',
    description: 'All the information you need to make the best decisions in Cabal Online',
    viewport: 'width=device-width, initial-scale=1',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <header className="border-b border-white border-opacity-10 p-2 ">
                    <Navigation />
                </header>
                <main className="mx-auto max-w-3xl p-2">{children}</main>
            </body>
        </html>
    )
}