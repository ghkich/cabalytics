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
                    <header className="border-b border-neutral-800 border-opacity-50 bg-neutral-900">
                        <div className="mx-auto flex max-w-5xl items-center gap-5 px-5 py-4">
                            <Link href={`/${params.lang}`} className="group translate-y-[-1px] leading-snug">
                                <h1
                                    className={cls(
                                        exo2.className,
                                        ' text-neutral-400 transition-colors duration-200 group-hover:text-sky-300'
                                    )}
                                >
                                    Cabalytics
                                </h1>
                                <div className="text-[11px] text-neutral-600 transition-colors duration-200 group-hover:text-neutral-500">
                                    by Starrk
                                </div>
                            </Link>
                            <div className="flex items-center">
                                <div className="ml-1 h-5 w-[1px] bg-neutral-800 bg-opacity-75"></div>
                                <div className="ml-1 h-6 w-[1px] bg-neutral-800"></div>
                                <div className="ml-1 h-7 w-[1px] bg-neutral-700"></div>
                            </div>
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