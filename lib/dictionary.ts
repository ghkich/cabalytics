import type { Locale } from '@/i18n.config'

const dictionaries = {
    en: () => import('@/dictionaries/en.json').then((module) => module.default),
    pt: () => import('@/dictionaries/pt.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

export const translate = (key: string, dictionary: object, params?: { [key: string]: string | number }) => {
    let translation = key.split('.').reduce((obj: any, key: string) => obj && obj[key], dictionary)
    if (!translation) {
        return key
    }
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            translation = translation.replace(`{{ ${key} }}`, String(value))
        })
    }
    return translation
}
export const getTranslations = async (locale: Locale) => {
    const dictionary = await dictionaries[locale]()
    return (key: string, params?: { [key: string]: string | number }) => {
        return translate(key, dictionary, params)
    }
}