import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

//'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif

const theme = createTheme({
  typography: {
    fontFamily: `'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`,
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
