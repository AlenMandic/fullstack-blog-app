import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import getUserProfileService from '../services/handleUsers'
import ExploreBlog from './ExploreBlog'

export default function UserPage({ user, userLikedBlogs }) {

    const [currentUserProfile, setCurrentUserProfile] = useState({})
    const [currentUserBlogs, setCurrentUserBlogs] = useState([])
    const [showErrorPage, setShowErrorPage] = useState(false)

    const { userId } = useParams()
    console.log('User ID for individual user route being called: ', userId)

    // retrieve the initial user profile and display it. IMPLEMENT If it doesn't exist, return an error page.
    useEffect(() => {

        const getUserProfile = async () => {

           try {
             const response = await getUserProfileService.getIndividualUser(userId)
             console.log(response)

             if(response === 400 || response === 404) {
                setShowErrorPage(true)
                return null
             }

             setCurrentUserProfile(response.data)
             setCurrentUserBlogs(response.data.blogs)
             setShowErrorPage(false)
             return response.data

           } catch(err) {
            console.log(err)
           }
        }
        getUserProfile()

    }, [])

    const userBlogs = currentUserBlogs.map(blog => (
        <ExploreBlog key={blog.id} blogObject={blog} user={user} userLikedBlogs={userLikedBlogs} showPostedBy={false} />
    ))

    const errorPage = (
        <div className="errorPage">
        <h1>🛠️ Something went wrong. Ensure the user profile you are looking for exists.</h1>
        </div>
    )

    const userPage =  (
        <div className="userPage">
        <h1>Welcome to {currentUserProfile.name}{'\''}s profile</h1>
        </div>
    )

    const renderUserProfile = showErrorPage === false ? userPage : errorPage

    return (
        <>
        {renderUserProfile}
        {userBlogs}
        </>
    )
}