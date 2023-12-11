import { useState, useEffect } from 'react'
import userService from '../services/handleUsers'
import { Link } from 'react-router-dom'

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

const ourUsers = <ul>
    {users.map(user => (
        // eslint-disable-next-line quotes
        <li key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link></li>
    ))}
</ul>

    return (
    <>
    <h1>Welcome to our users page.</h1>
    <p>View individual user profiles and their posts.</p>
    {ourUsers}
    </>
)
}