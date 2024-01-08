import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Typography, useMediaQuery } from '@mui/material'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://blog-list-app-backend.fly.dev">
        SnapBlog
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function SignUp({ user, username, setUsername, name, setName, password, setPassword, repeatPassword, setRepeatPassword, handleSignUp }) {

  const isMobile = useMediaQuery('(max-width:500px)')

  const loggedIn = <Typography variant="h3" sx={{ mt: '55px' }}>You are already logged in and have an account.</Typography>

  const notLoggedIn = <ThemeProvider theme={defaultTheme}>
  <Container component="main" maxWidth="xs" sx={{ backgroundColor: 'white', color: 'black', borderRadius: '8px' }}>
    <CssBaseline />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSignUp} sx={{ mt: 3 }} autoComplete='signup-form'>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="signupUsername"
              label="Username"
              name="signupUsername"
              autoComplete="new-username"
              value={username}
              inputProps={{
                minLength: 3,
                maxLength: 30,
              }}
              onChange={({
                target
              }) => setUsername(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="signUpname"
              label="Name"
              name="signUpname"
              autoComplete="new-name"
              value={name}
              inputProps={{
                minLength: 3,
                maxLength: 30,
              }}
              onChange={({
                target
              }) => setName(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="signUp-password"
              label="Password"
              type="password"
              id="signUp-password"
              autoComplete='new-password21351212315'
              value={password}
              inputProps={{
                minLength: 15,
                maxLength: 80,
              }}
              onChange={({
                target
              }) => setPassword(target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="repeatPassword"
              label="Repeat password"
              type="password"
              id="repeatPassword"
              autoComplete='new-repeatPassword'
              value={repeatPassword}
              inputProps={{
                minLength: 15,
                maxLength: 80,
              }}
              onChange={({
                target
              }) => setRepeatPassword(target.value)}
            />
          </Grid>
        </Grid>
        <Alert severity="info" style={{ backgroundColor: '#1f1f54', color: 'white', marginTop: '20px' }}>Password must be 15 characters or more; include atleast 1 capital letter, 1 number, and 1 special character!</Alert>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/api/login" variant="body2" sx={{ mr: '100px' }}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
    <Copyright sx={{ mt: 5 }} />
  </Container>
</ThemeProvider>

  return (
<>
{!user && <Typography variant={isMobile ? 'h6' : 'h4'} sx={{ textAlign: 'center', mb: '40px' }}>Create an account</Typography>}
{user && loggedIn}
{!user && notLoggedIn}
</>
  )
}