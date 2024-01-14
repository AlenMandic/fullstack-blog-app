import { useState, useEffect } from 'react'
import userService from '../services/handleUsers'
import { Link } from 'react-router-dom'
import { List, ListItemButton, ListItemText } from '@mui/material'
import Typography from '@mui/material/Typography'

export default function UsersPage() {

const [users, setUsers] = useState([])

useEffect(() => {

   const getUsers = async () => {

    try {
        const response = await userService.getAllUsers()
        setUsers(response)
        return response

    } catch(err) {
        alert(err.message)
    }

   }

   getUsers()

}, [])

const ourUsers = <List>
{users.map((user) => (
  <ListItemButton key={user.id} component={Link} to={`/api/users/${user.id}`} sx={{ textDecoration: 'none', borderRadius: '15px', color: 'black', '&:hover': { backgroundColor: 'black', color: 'white' }  }}>
    <ListItemText primary={<Typography variant="subtitle2" component="div" sx={{ fontSize: '20px' }}>
          <span>{user.name}</span>
          <span> - Posted</span>
          <span style={{ marginLeft: '4px', fontSize: '30px' }}>{user.blogs.length}</span>
          <span> blogs</span>
        </Typography>} />
  </ListItemButton>
))}
</List>

    return (
    <>
    <h1>Welcome to our users page.</h1>
    <p>View individual user profiles and their posts.</p>
    {ourUsers}
    </>
)
}