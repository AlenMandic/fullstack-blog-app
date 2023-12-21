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
        console.log(response)
        return response

    } catch(err) {
        console.log(err)
    }
   }

   getUsers()

}, [])

const ourUsers = <List>
{users.map((user) => (
  <ListItemButton key={user.id} component={Link} to={`/users/${user.id}`} sx={{ textDecoration: 'none', color: '#2196F3', '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }, }}>
    <ListItemText primary={<Typography variant="subtitle2" component="div">
          <span style={{ fontWeight: 'bold', color: '#babad4', fontSize: '20px' }}>{user.name}</span>
          <span style={{ color: '#9e9e9e' }}> - Posted</span>
          <span style={{ fontWeight: 'bold', color: '#babad4', marginLeft: '4px', fontSize: '25px' }}>{user.blogs.length}</span>
          <span style={{ color: '#9e9e9e' }}> blogs</span>
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