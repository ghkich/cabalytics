import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/i18n.config'

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
    const { navigation } = await getDictionary(lang)
    return (
        <main className="flex max-w-lg items-center">
            <h1 className="text-center text-xs text-gray-300">{navigation.about}</h1>
        </main>
    )
}