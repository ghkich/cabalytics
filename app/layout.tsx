import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import { Exo_2, Roboto } from 'next/font/google'
import { Navigation } from '@/app/components/Navigation'
import { cls } from '@/app/lib/utils'

const exo2 = Exo_2({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
    title: 'Cabalytics',
    description: 'All the information you need to make the best decisions in Cabal Online',
    viewport: 'width=device-width, initial-scale=1',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <header className="border-b border-white border-opacity-5 bg-neutral-900 bg-opacity-60 font-light">
                    <div className="mx-auto flex max-w-3xl items-center gap-3 p-3">
                        <h1 className={cls(exo2.className, 'mt-[-3px] text-xs text-neutral-400')}>Cabalytics</h1>
                        <span className="opacity-5">|</span>
                        <Navigation />
                    </div>
                </header>
                <main className="">
                    <div className="mx-auto max-w-3xl p-3">{children}</div>
                </main>
            </body>
        </html>
    )
}