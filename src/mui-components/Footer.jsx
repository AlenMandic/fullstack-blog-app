import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { IconButton } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

function Copyright() {
  return (
    <Typography variant="body2" color="white">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/" target='_blank'>
        Your Website, Alen Mandic
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: '100px',
            color: 'white',
            backgroundColor: '#585858'
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1" sx={{ fontSize: '14px' }}>We hope you enjoyed your stay and found interesting blogs! 😄</Typography>
            <IconButton>
        <Link href="https://github.com" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ ml: '30px' }}>
          <GitHubIcon sx={{ width: '40px', height: '40px' }} />
        </Link>
      </IconButton>

      <IconButton>
        <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ ml: '30px' }}>
          <LinkedInIcon sx={{ width: '40px', height: '40px' }} />
        </Link>
      </IconButton>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}