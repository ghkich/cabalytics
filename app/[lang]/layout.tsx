import 'app/[lang]/globals.css'
import type { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'
import { Navigation } from '@/app/[lang]/components/Navigation'
import { i18n, Locale } from '@/i18n.config'
import { LanguageProvider } from '@/app/[lang]/language-provider'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Cabalytics',
    description: 'All the information you need to make the best decisions in Cabal Online',
    viewport: 'width=device-width, initial-scale=1',
}

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }))
}
export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
    return (
        <html lang={params.lang}>
            <LanguageProvider language={params.lang}>
                <body className={inter.className}>
                    <header className="bg-neutral-910">
                        <div className="mx-auto flex max-w-5xl items-center gap-5 px-3 lg:px-0">
                            <Navigation lang={params.lang} />
                        </div>
                    </header>
                    <div className="bg-neutral-825 mt-0.5 h-2 w-full">
                        <div className="mx-auto h-2 w-full max-w-5xl px-1.5">
                            <div className="h-2 w-full bg-neutral-800" />
                        </div>
                    </div>
                    <main className="">
                        <div className="mx-auto max-w-5xl p-1.5">{children}</div>
                    </main>
                </body>
            </LanguageProvider>
        </html>
    )
}