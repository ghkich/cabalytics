import { Locale } from '@/i18n.config'
import { getTranslations } from '@/lib/dictionary'
import { NavigationLink } from '@/app/[lang]/components/NavigationLink'
import { cls } from '@/lib/utils'
import { Exo_2 } from 'next/font/google'

const exo2 = Exo_2({ subsets: ['latin'] })

const getRoutes = (lang: Locale) => [
    { href: `/${lang}/about`, name: 'about', isHome: false },
    // { href: `/${lang}/damage-calculator`, name: 'calculator' },
]

export const Navigation = async ({ lang }: { lang: Locale }) => {
    const t = await getTranslations(lang)
    return (
        <nav className="group flex items-center gap-5">
            {getRoutes(lang).map(({ href, name, isHome }) => (
                <NavigationLink
                    key={href}
                    href={href}
                    className=""
                    goBackText={t(`navigation.${name}_go_back`)}
                    goBackHref={`/${lang}/`}
                >
                    <div className={cls({ [`${exo2.className} translate-y-[-1px] text-[16px]`]: isHome })}>
                        {t(`navigation.${name}`)}
                    </div>
                </NavigationLink>
            ))}
        </nav>
    )
}