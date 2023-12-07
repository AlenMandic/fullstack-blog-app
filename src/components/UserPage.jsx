import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import getUserProfileService from '../services/handleUsers'

export default function UserPage() {

    const [currentUserProfile, setCurrentUserProfile] = useState({})

    const { userId } = useParams()
    console.log('User ID for individual user route being called: ', userId)

    // retrieve the initial user profile and display it. IMPLEMENT If it doesn't exist, return an error page.
    useEffect(() => {

        const getUserProfile = async () => {
           try {
             const response = await getUserProfileService.getIndividualUser(userId)
             console.log(response)
             setCurrentUserProfile(response)
             return response

           } catch(err) {
            console.log(err)
           }
        }
        getUserProfile()

    }, [])

    return (
        <>
        <h2>Testing individual user page</h2>
        <p>{currentUserProfile.name}</p>
        </>
    )
}