import { useLanguage } from '@/app/[lang]/language-provider'

const useFormatLocale = () => {
    const lang = useLanguage()

    return {
        formatNumber: (number: number, options?: Intl.NumberFormatOptions) =>
            new Intl.NumberFormat(lang, {
                maximumFractionDigits: 0,
                ...options,
            }).format(number),
    }
}

export default useFormatLocale