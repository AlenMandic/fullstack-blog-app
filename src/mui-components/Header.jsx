import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/Home'

import { Link } from 'react-router-dom'

const drawerWidth = 240

function ResponsiveHeader(props) {

  const { window } = props
  const { user } = props
  const { handleLogout } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  function handleLogOutCallback() {
    handleLogout()
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', }}>
      <Typography variant="h6" sx={{ my: 2, textDecoration: 'none' }} onClick={() => location.reload()}>
        SnapBlog 📖
      </Typography>
      <Divider />
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
           <Button sx={{ fontSize: '16px', color: 'blue' }}>
            <HomeIcon />
           </Button>
          </Link>
          <Divider />
          <Link to="/api/blogs" style={{ textDecoration: 'none', color: 'black' }}>
           <Button sx={{ fontSize: '16px', color: 'blue' }}>
            Front Page
           </Button>
          </Link>
          <Divider />
          <Link to="/api/users" style={{ textDecoration: 'none', color: 'black' }}>
           <Button sx={{ fontSize: '16px', color: 'blue' }}>
            Users
           </Button>
          </Link>
          <Divider />
    {user && <Button  sx={{ color: 'black', fontSize: '16px' }} onClick={handleLogOutCallback}>Log Out</Button>}
    {!user && <Link to="/api/register" style={{ textDecoration: 'none', color: 'black' }}>
           <Button sx={{ fontSize: '16px', color: 'black' }}>
            Create Account
           </Button>
          </Link>}
          <Divider />
          {!user && <Link to="/api/login" style={{ textDecoration: 'none', color: 'black' }}>
           <Button sx={{ fontSize: '16px', color: 'black' }}>
            Log In
           </Button>
          </Link>}
          <Divider />
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ backgroundColor: 'white' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, color: 'black' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            onClick={() => location.reload()}
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'block', color: 'black', cursor: 'pointer' } }}
          >
            SnapBlog 📖
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
           <Button sx={{ fontSize: '16px', '&:hover': {
    backgroundColor: 'black',
    color: 'white',
  }, color: 'black',  }}>
            <HomeIcon />
           </Button>
          </Link>
          <Link to="/api/blogs" style={{ textDecoration: 'none', color: 'black' }}>
           <Button sx={{ fontSize: '16px', '&:hover': {
    backgroundColor: 'black',
    color: 'white',
  }, color: 'black',  }}>
            Front Page
           </Button>
          </Link>
          <Link to="/api/users" style={{ textDecoration: 'none', color: 'black' }}>
           <Button sx={{ fontSize: '16px', '&:hover': {
    backgroundColor: 'black',
    color: 'white',
  }, color: 'black',  }}>
            Users
           </Button>
          </Link>
    {user && <Button  sx={{ color: 'black', fontSize: '16px', '&:hover': {
    backgroundColor: 'black',
    color: 'blue'
  }, }} onClick={handleLogOutCallback}>Log Out</Button>}
    {!user && <Link to="/api/register" style={{ textDecoration: 'none', color: 'black' }}>
           <Button sx={{ fontSize: '16px', '&:hover': {
    backgroundColor: 'black',
    color: 'blue',
  }, color: 'black',  }}>
            Create Account
           </Button>
          </Link>}
          {!user && <Link to="/api/login" style={{ textDecoration: 'none', color: 'black' }}>
           <Button sx={{ fontSize: '16px', '&:hover': {
    backgroundColor: 'black',
    color: 'blue',
  }, color: 'black',  }}>
            Log In
           </Button>
          </Link>}
</Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  )
}

export default ResponsiveHeader