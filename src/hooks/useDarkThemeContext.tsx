import { createContext, useContext, useState } from "react"

const DarkThemeContext = createContext<[boolean, () => void]>([false, () => {}])

export const DarkThemeContextProvider: React.FC = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const toggleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }
  return <DarkThemeContext.Provider value={[isDarkTheme, toggleDarkTheme]}>{children}</DarkThemeContext.Provider>
}

export const useDarkThemeContext = () => useContext(DarkThemeContext)
