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
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
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
      <Box component="form" onSubmit={handleSignUp} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="username"
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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
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
              name="password"
              label="Password"
              type="password"
              id="password"
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
            <Link href="http://localhost:5173/login" variant="body2" sx={{ mr: '100px' }}>
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
{user && loggedIn}
{!user && notLoggedIn}
</>
  )
}