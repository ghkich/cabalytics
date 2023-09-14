import 'app/[lang]/globals.css'
import React from 'react'
import { Exo_2, Inter } from 'next/font/google'
import { i18n, Locale } from '@/i18n.config'
import { LanguageProvider } from '@/app/[lang]/language-provider'
import styles from './layout.module.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { getDictionary } from '@/lib/dictionary'
import { cls } from '@/lib/utils'
import { NavigationLink } from '@/app/[lang]/components/NavigationLink'
import { Navigation } from '@/app/[lang]/components/Navigation'

config.autoAddCss = false

const inter = Inter({ subsets: ['latin'] })
const exo2 = Exo_2({ subsets: ['latin'] })

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }) {
    const dic = await getDictionary(lang)
    return {
        title: `Cabalc - ${dic.metadata.title}`,
        description: dic.metadata.description,
        viewport: 'width=device-width, initial-scale=1',
    }
}

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
    return (
        <html lang={params.lang}>
            <LanguageProvider language={params.lang}>
                <body className={inter.className}>
                    <header>
                        <div className="bg-neutral-910">
                            <div className="mx-auto flex max-w-5xl items-center justify-between gap-5 px-3 lg:px-0">
                                <div className="flex shrink-0 items-center gap-2">
                                    <NavigationLink href={`/${params.lang}`} className="flex items-center gap-2 py-2.5">
                                        <h1 className={cls(exo2.className, 'text-sm uppercase text-neutral-400')}>
                                            Cabalc <span className="text-neutral-600">V5</span>
                                        </h1>
                                        {/*<div className="translate-y-[1px] text-[10px] text-neutral-700">*/}
                                        {/*    Alpha Release*/}
                                        {/*</div>*/}
                                        {/*<h2 className="translate-y-[1px] text-[11px] text-neutral-600">V5.0 - Beta</h2>*/}
                                    </NavigationLink>
                                </div>
                                <Navigation lang={params.lang} />
                            </div>
                        </div>
                        <div className="mt-0.5 h-2 w-full bg-neutral-875">
                            <div className="mx-auto h-2 w-full max-w-5xl px-1.5">
                                <div className="h-2 w-full bg-neutral-850" />
                            </div>
                        </div>
                    </header>
                    <main className={styles.main}>
                        <div className="mx-auto max-w-5xl p-1.5">{children}</div>
                    </main>
                </body>
            </LanguageProvider>
        </html>
    )
}