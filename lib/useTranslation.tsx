// useTranslation.js
import { useEffect, useState } from 'react'
import { getDictionary, translate } from '@/lib/dictionary'
import { useLanguage } from '@/app/[lang]/language-provider'

const useTranslation = () => {
    const lang = useLanguage()
    const [dictionary, setDictionary] = useState({})
    const ready = Object.keys(dictionary).length > 0
    const placeholder = '---'

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
        ready,
        t: (key: string, params?: { [key: string]: string | number }) =>
            ready ? translate(key, dictionary, params) : placeholder,
        dictionary,
    }
}

export default useTranslation