import { useParams } from 'react-router-dom'
import { useIndividualBlog } from '../custom-hooks/useIndividualBlog'
import { useGetUserLikedBlogs } from '../custom-hooks/useGetUserLikedBlogs'
import handleBlogs from '../services/handleBlogs'
import ExploreBlog from './ExploreBlog'
import Alert from '@mui/material/Alert'
import { Container, Typography, useMediaQuery } from '@mui/material'
import LoadingSpinner from '../mui-components/LoadingSpinner'
import CommentForm from '../mui-components/CommentForm'
import CommentPost from '../mui-components/CommentPost'

export default function IndividualBlogPage({ user }) {

    const isMobile = useMediaQuery('(max-width:500px)')

    const { blogId } = useParams()
    const { blogInfo, comments, setComments, loading, error } = useIndividualBlog(blogId)
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

    const handleCommentSubmit = async (event, commentContent) => {

        const trimmedContent = commentContent.trim()

        if (trimmedContent.length < 3 || trimmedContent.length === 0) {
          alert('Invalid comment content. Please enter at least 3 characters.')
          return
        }

       try {

        if(user) {

            const newComment = {

                postedBy: {
                  username: user.username,
                  id: user.id,
                },
                commentContent: trimmedContent,
              }

            const response = await handleBlogs.addBlogComment(blogId, newComment)

            setComments([response, ...comments])
            return response

        } else {
           alert('Please log in to post comments.')
           return
        }

       } catch(err) {
        alert(err)
       }

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
  <Typography variant="h5" sx={{ my: '30px', ml: '-45px', color: 'black' }}>Comments</Typography>
  <CommentForm onSubmit={handleCommentSubmit}/>
  {comments.map((comment, index) => (
          <CommentPost key={index} comment={comment} />
        ))}
    </Container>
}