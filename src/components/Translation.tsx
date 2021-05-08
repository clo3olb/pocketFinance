import { createContext, useContext, useState } from "react"

export const LanguageContext = createContext<LanguageContextValueType>(["en", (lang: keyof LanguageType) => {}])

type LanguageContextValueType = [keyof LanguageType, (lang: keyof LanguageType) => void]

export type LanguageType = {
  kr: string
  en: string
}

export const useLanguageContext = () => useContext(LanguageContext)

export const TranslationContextProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState<keyof LanguageType>("en")
  return <LanguageContext.Provider value={[language, setLanguage]}>{children}</LanguageContext.Provider>
}

type TranslationProps = {
  text: LanguageType
}

const Translation = ({ text }: TranslationProps) => {
  const [language] = useContext(LanguageContext)
  return <>{text[language]}</>
}

export default Translation
