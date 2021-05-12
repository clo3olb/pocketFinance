import { DarkThemeContextProvider } from "hooks/useDarkThemeContext"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

ReactDOM.render(
  <React.StrictMode>
    <DarkThemeContextProvider>
      <App />
    </DarkThemeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
