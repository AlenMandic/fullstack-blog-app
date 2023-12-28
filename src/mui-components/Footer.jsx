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
    <Typography variant="body2" color="black">
      {'Copyright © '}
      <Link color="inherit" href="https://blog-list-app-backend.fly.dev" target='_blank'>
        SnapBlog, Alen Mandic
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
            backgroundColor: 'white',
            width: '100%',
          }}
        >
          <Container component="main" maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body1">Contact me:</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <IconButton id="github-button" aria-label="Link to my GitHub">
        <Link href="https://github.com" target="_blank" rel="noopener noreferrer" color="inherit" aria-label="Link to my GitHub">
          <GitHubIcon sx={{ width: '40px', height: '40px', color: 'black' }} />
        </Link>
      </IconButton>

      <IconButton id="linkedin-button" aria-label="Link to my LinkedIn">
        <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" color="inherit" aria-label="Link to my GitHub">
          <LinkedInIcon sx={{ width: '40px', height: '40px', color: 'black' }} />
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