import { useState, useEffect } from 'react'
import userService from '../services/handleUsers'
import { Link } from 'react-router-dom'
import { List, ListItemButton, ListItemText } from '@mui/material'

export default function UsersPage() {

const [users, setUsers] = useState([])

useEffect(() => {

   const getUsers = async () => {
    try {
        const response = await userService.getAllUsers()
        setUsers(response)
        return response

    } catch(err) {
        console.log(err)
    }
   }

   getUsers()

}, [])

const ourUsers = <List>
{users.map((user) => (
  <ListItemButton key={user.id} component={Link} to={`/users/${user.id}`} sx={{ textDecoration: 'none', color: '#2196F3' }}>
    <ListItemText primary={user.name} />
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