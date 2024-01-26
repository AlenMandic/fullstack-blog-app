import { useParams } from 'react-router-dom'
import { useGetIndividualUser } from '../custom-hooks/useGetIndividualUser'
import { useGetUserLikedBlogs } from '../custom-hooks/useGetUserLikedBlogs'
import ExploreBlog from './ExploreBlog'
import Alert from '@mui/material/Alert'
import LoadingSpinner from '../mui-components/LoadingSpinner'
import { Container, Typography } from '@mui/material'

export default function UserPage({ user }) {

    const { userId } = useParams()
    const { userLikedBlogs } = useGetUserLikedBlogs(user)
    const { currentUserProfile, currentUserBlogs, loading, error, showErrorPage } = useGetIndividualUser(userId)

    if(loading) {
        return <LoadingSpinner message={'Loading User Profile...'} />
    }

    if(error) {
        return <p>Error: {error.message}</p>
    }

    const userBlogs = currentUserBlogs.map(blog => (
        <ExploreBlog key={blog.id} blogObject={blog} user={user} getUserLikedBlogs={userLikedBlogs} showPostedBy={false} isIndividualPage={false} isRandomBlog={false} />
    ))

    const errorPage = (
        <div className="errorPage">
        <Alert severity="error" sx={{ fontWeight: '600', fontSize: '20px' }}>Ooops. That page is in another castle.</Alert>
        <h1 style={{ marginTop: '70px' }}>🛠️ Something went wrong. Ensure the user profile you are looking for exists.</h1>
        </div>
    )

    function getTotalLikes() {

        const getLikesArray = currentUserBlogs.map(blog => blog.likes)
        const sumTotalLikes = getLikesArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

        const likesElement = (
            <div>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginLeft: '-30px', color: 'black' }}>Total likes: <p style={{ color: 'blue' }}>{sumTotalLikes}</p></h1>
            </div>
        )

        return likesElement
    }

    const userPage =  (
        <div className="userPage">
        <h1 style={{ marginLeft: '-30px', color: 'black' }}>{currentUserProfile.name}</h1>
        {getTotalLikes()}
        <h2 style={{ marginLeft: '-30px', color: 'black' }}>Blogs posted:</h2>
        </div>
    )

    const renderUserProfile = showErrorPage === false ? userPage : errorPage

    return (
        <Container sx={{ ml: '20px' }}>
        {renderUserProfile}
        {!(showErrorPage) && userBlogs.length === 0 ? <h2 style={{ marginTop: '100px' }}>{currentUserProfile.name} has not posted any blogs yet!</h2> : userBlogs}
        </Container>
    )
}