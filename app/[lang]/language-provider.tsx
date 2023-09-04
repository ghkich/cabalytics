'use client'
import React, { useContext } from 'react'
import { i18n, Locale } from '@/i18n.config'

export type LanguageContext = Locale
export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}

export const LanguageContext = React.createContext<LanguageContext>(i18n.defaultLocale)

export const LanguageProvider = ({ language, children }: { language: Locale; children: React.ReactNode }) => {
    return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>
}