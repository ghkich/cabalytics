import { Locale } from '@/i18n.config'
import { getTranslations } from '@/lib/dictionary'
import { NavigationLink } from '@/app/[lang]/components/NavigationLink'

const getRoutes = (lang: Locale) => [
    { href: `/${lang}/damage-calculator`, name: 'damage_calculator' },
    { href: '#', name: 'collection_appraiser' },
]

export const Navigation = async ({ lang }: { lang: Locale }) => {
    const t = await getTranslations(lang)
    return (
        <nav className="flex items-center gap-3">
            {getRoutes(lang).map(({ href, name }) => (
                <NavigationLink key={href} href={href}>
                    <div className="leading-snug">
                        <div>{t(`navigation.${name}`)}</div>
                        <div className="text-[10px] opacity-50">{t(`navigation.${name}_sub`)}</div>
                    </div>
                </NavigationLink>
            ))}
        </nav>
    )
}