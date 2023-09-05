// useTranslation.js
import { useEffect, useState } from 'react'
import { getDictionary, translate } from '@/lib/dictionary'
import { useLanguage } from '@/app/[lang]/language-provider'

const useTranslation = () => {
    const lang = useLanguage()
    const [dictionary, setDictionary] = useState({})

    useEffect(() => {
        getDictionary(lang)
            .then((newDictionary) => {
                setDictionary(newDictionary)
            })
            .catch((error) => {
                console.error('Failed to fetch dictionary:', error)
            })
    }, [lang])

    return {
        lang,
        t: (key: string, params?: { [key: string]: string | number }) => translate(key, dictionary, params),
        dictionary,
    }
}

export default useTranslation