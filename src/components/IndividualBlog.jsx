import { useParams } from 'react-router-dom'
import { useIndividualBlog } from '../custom-hooks/useIndividualBlog'
import { useGetUserLikedBlogs } from '../custom-hooks/useGetUserLikedBlogs'
import ExploreBlog from './ExploreBlog'
import Alert from '@mui/material/Alert'
import { Container, Typography, useMediaQuery } from '@mui/material'
import LoadingSpinner from '../mui-components/LoadingSpinner'
import CommentForm from '../mui-components/addComment'

export default function IndividualBlogPage({ user }) {

    const isMobile = useMediaQuery('(max-width:500px)')

    const { blogId } = useParams()
    const { blogInfo, loading, error } = useIndividualBlog(blogId)
    const { userLikedBlogs } = useGetUserLikedBlogs(user)

    const errorPage = (
        <div className="errorPage">
        <Alert severity="error" sx={{ fontWeight: '600', fontSize: '20px' }}>Ooops. That page is in another castle.</Alert>
        <h1 style={{ marginTop: '70px' }}>🛠️ Something went wrong. Ensure the blog post you are looking for exists.</h1>
        </div>
    )

    if(loading) {
        return <LoadingSpinner message={'Loading blog data...'} />

    } else if (error) {
        return errorPage
    }

    const handleCommentSubmit = (event, commentContent) => {
        // Now you have access to both the event and commentContent in the parent
        console.log(commentContent)
    }

    return <Container sx={{ ml: '20px' }}>
    <Typography variant={isMobile ? 'h6' : 'h4'} sx={{ my: '30px', ml: '-40px', color: 'black' }}>Viewing individual blog post</Typography>
    <ExploreBlog
    blogObject={blogInfo}
    user={user}
    getUserLikedBlogs={userLikedBlogs}
    showPostedBy={true}
    isIndividualPage={true}
  />
  <Typography variant="h5" sx={{ my: '30px' }}>Comments</Typography>
  <CommentForm onSubmit={handleCommentSubmit}/>
    </Container>
}