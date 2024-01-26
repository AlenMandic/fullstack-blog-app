import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { Typography, useMediaQuery } from '@mui/material'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { IconButton } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

function Copyright() {
  return (
    <Typography variant="body2" color="black" sx={{ fontFamily: 'Cambria' }}>
      {'Copyright © '}
      <Link color="inherit" href="https://blog-list-app-backend.fly.dev" target='_blank'>
        Alen Mandic
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function StickyFooter() {

  const isMobile = useMediaQuery('(max-width:500px)')

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          mt: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            color: 'black',
            borderRadius: '4px',
            backgroundColor: '#a29797',
            minWidth: '40%',
          }}
        >
          <Container component="main" maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ fontSize: isMobile ? '16px' : '20px', fontStyle: 'italic', mr: '10px', fontFamily: 'Cambria' }}>Contact me</Typography>
            <IconButton id="github-button" aria-label="Link to my GitHub">
        <Link href="https://github.com/AlenMandic" target="_blank" rel="noopener noreferrer" color="inherit" aria-label="Link to my GitHub">
          <GitHubIcon sx={{ width: '40px', height: '40px', color: 'black','&:hover': {
            color: 'blue',
            transform: 'scale(1.2)',
          }, }} />
        </Link>
      </IconButton>

      <IconButton id="linkedin-button" aria-label="Link to my LinkedIn">
        <Link href="https://www.linkedin.com/in/alen-mandic-2327a92a7/" target="_blank" rel="noopener noreferrer" color="inherit" aria-label="Link to my LinkedIn">
          <LinkedInIcon sx={{ width: '40px', height: '40px', color: 'black', '&:hover': {
            color: 'blue',
            transform: 'scale(1.2)',
          }, }} />
        </Link>
      </IconButton>
            </Box>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}