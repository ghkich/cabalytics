import { Locale } from '@/i18n.config'
import { getTranslations } from '@/lib/dictionary'
import { NavigationLink } from '@/app/[lang]/components/NavigationLink'

const getRoutes = (lang: Locale) => [
    { href: `/${lang}`, name: 'about' },
    { href: `/${lang}/damage-calculator`, name: 'damage_calculator' },
    { href: '#', name: 'collection_appraiser' },
]

export const Navigation = async ({ lang }: { lang: Locale }) => {
    const t = await getTranslations(lang)
    return (
        <nav className="flex max-w-3xl items-center gap-3">
            {getRoutes(lang).map(({ href, name }) => (
                <NavigationLink key={href} href={href}>
                    {t(`navigation.${name}`)}
                </NavigationLink>
            ))}
        </nav>
    )
}