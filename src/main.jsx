import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: 'Cambria', // Replace YourFontFamily with the desired font
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <React.StrictMode>
     <App />
    </React.StrictMode>
    </ThemeProvider>
)
