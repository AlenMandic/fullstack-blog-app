import { useState, useEffect } from 'react'
import userService from '../services/handleUsers'

// Fetches and handles a list of all users for the 'UsersPage.jsx' component
export const useGetUsers = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        const getUsers = async () => {

         try {
            setLoading(true)
             const response = await userService.getAllUsers()
             setUsers(response)

        } catch(err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }

        }

        getUsers()

     }, [])

     return { users, loading, error }

}