import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const defaultTheme = createTheme()

export default function SignInSide({ username, setUsername, password, setPassword, showPassword, handleShowPassword, handleLogin, user }) {

    const loggedIn = <Typography variant="h2">You are currently logged in.</Typography>
    const notLoggedIn = <ThemeProvider theme={defaultTheme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
    label="Username"
    value={username}
    margin="normal"
    required
    fullWidth
    id="username-input"
    name="username-input"
    autoComplete="username"
    autoFocus
    inputProps={{
      minLength: 3,
      maxLength: 30,
    }}
    onChange={({
      target
    }) => setUsername(target.value)}
  />
      <TextField
      label="Password"
      value={password}
      margin="normal"
      required
      fullWidth
      id="password-input"
      name="password-input"
      type={showPassword ? 'text' : 'password'}
      onChange={({
          target
        }) => setPassword(target.value)}
    />
  <FormControlLabel
    control={<Checkbox id="show-password-checkbox" name="show-password-checkbox" color="primary" value={showPassword} onChange={handleShowPassword} />}
    label="Show password"
  />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="http://localhost:5173/register" variant="body2">
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>

  return (
    <>
    <Typography variant="h4" sx={{ m: '50px' }}>Welcome to your login page.</Typography>
     {!user && notLoggedIn}
     {user && loggedIn}
    </>
  )
}