import { useState } from 'react'

import type { Language } from '../types/language'
import {
    translations,
    type TranslationContent,
} from '../content/translations'

export function useLanguage() {
    const [language, setLanguage] = useState<Language>('en')

    const content: TranslationContent = translations[language]

    return {
        language,
        setLanguage,
        content,
    }
}