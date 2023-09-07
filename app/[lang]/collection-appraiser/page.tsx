import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/i18n.config'

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
    const { navigation } = await getDictionary(lang)
    return (
        <div className="flex max-w-lg flex-col p-4">
            <h1 className="pb-2 uppercase text-neutral-300">{navigation.collection_appraiser}</h1>
            <p className="text-neutral-450 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum.
                Quisquam,
            </p>
        </div>
    )
}