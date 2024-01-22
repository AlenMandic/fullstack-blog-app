// Fetches and handles an individual user for the 'IndividualUser.jsx' component
import { useState, useEffect } from 'react'
import getUserProfileService from '../services/handleUsers'

export const useGetIndividualUser = (userId) => {

    const [currentUserProfile, setCurrentUserProfile] = useState({})
    const [currentUserBlogs, setCurrentUserBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showErrorPage, setShowErrorPage] = useState(false)

    useEffect(() => {

        const getUserProfile = async () => {

           try {
            setLoading(true)
             const response = await getUserProfileService.getIndividualUser(userId)

             if(response === 400 || response === 404) {
                setLoading(false)
                setShowErrorPage(true)
                return null
             }

             setCurrentUserProfile(response)
             setCurrentUserBlogs(response.blogs)
             setShowErrorPage(false)

           } catch(err) {
            setError(err.message)
           } finally {
            setLoading(false)
           }
        }
        getUserProfile()

    }, [userId])

    return { currentUserProfile, currentUserBlogs, loading, error, showErrorPage }

}