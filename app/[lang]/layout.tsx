import 'app/[lang]/globals.css'
import type { Metadata } from 'next'
import React from 'react'
import { Exo_2, Inter } from 'next/font/google'
import { Navigation } from '@/app/[lang]/components/Navigation'
import { cls } from '@/lib/utils'
import { i18n, Locale } from '@/i18n.config'
import { LanguageProvider } from '@/app/[lang]/language-provider'
import Link from 'next/link'

const exo2 = Exo_2({ subsets: ['latin'] })
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
                    <header className="border-b border-neutral-800 border-opacity-50 bg-neutral-900 font-light">
                        <div className="mx-auto flex max-w-5xl items-center gap-5 px-3 py-3.5">
                            <Link
                                href={`/${params.lang}`}
                                className="font-light leading-snug opacity-50 transition-opacity duration-200 hover:opacity-80"
                            >
                                <h1 className={cls(exo2.className, 'mt-[-2px] text-sm text-neutral-200 ')}>
                                    Cabalytics
                                </h1>
                                <div className="text-[10px] text-neutral-400 opacity-50">by Starrk</div>
                            </Link>
                            <div className="ml-1.5 h-6 w-[1px] -skew-x-12 bg-neutral-700 bg-opacity-50"></div>
                            <Navigation lang={params.lang} />
                        </div>
                    </header>
                    <main className="">
                        <div className="mx-auto max-w-5xl p-3">{children}</div>
                    </main>
                </body>
            </LanguageProvider>
        </html>
    )
}