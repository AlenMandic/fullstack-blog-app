import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import getUserProfileService from '../services/handleUsers'
import { useGetIndividualUser } from '../custom-hooks/useGetIndividualUser'
import ExploreBlog from './ExploreBlog'
import Alert from '@mui/material/Alert'
import LoadingSpinner from '../mui-components/LoadingSpinner'

export default function UserPage({ user, userLikedBlogs }) {

    const { userId } = useParams()

    const { currentUserProfile, currentUserBlogs, loading, error, showErrorPage } = useGetIndividualUser(userId)

    if(loading) {
        return <LoadingSpinner message={'Loading User Profile...'} />
    }

    if(error) {
        return <p>Error: {error.message}</p>
    }

    const userBlogs = currentUserBlogs.map(blog => (
        <ExploreBlog key={blog.id} blogObject={blog} user={user} userLikedBlogs={userLikedBlogs} showPostedBy={false} enableLikeButton={false} />
    ))

    const errorPage = (
        <div className="errorPage">
        <Alert severity="error">Ooops. That page is in another castle.</Alert>
        <h1 style={{ marginTop: '70px' }}>🛠️ Something went wrong. Ensure the user profile you are looking for exists.</h1>
        </div>
    )

    function getTotalLikes() {

        const getLikesArray = currentUserBlogs.map(blog => blog.likes)
        const sumTotalLikes = getLikesArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

        const likesElement = (
            <div>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>Total likes: <p style={{ color: 'blue' }}>{sumTotalLikes}</p></h1>
            </div>
        )

        return likesElement
    }

    const userPage =  (
        <div className="userPage">
        <h1>Welcome to {currentUserProfile.name}{'\''}s profile</h1>
        {getTotalLikes()}
        <h2>Blogs posted:</h2>
        </div>
    )

    const renderUserProfile = showErrorPage === false ? userPage : errorPage

    return (
        <>
        {renderUserProfile}
        {!(showErrorPage) && userBlogs.length === 0 ? <h2 style={{ marginTop: '100px' }}>{currentUserProfile.name} has not posted any blogs yet!</h2> : userBlogs}
        </>
    )
}