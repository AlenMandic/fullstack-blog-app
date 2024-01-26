import { useState, useEffect, React } from 'react'
import ExploreBlog from './ExploreBlog'
import BasicSelect from '../mui-components/SelectMenu'
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import Alert from '@mui/material/Alert'
import { useGetUserLikedBlogs } from '../custom-hooks/useGetUserLikedBlogs'
import { useCreateExplorePage } from '../custom-hooks/useCreateExplorePage'
import LoadingSpinner from '../mui-components/LoadingSpinner'

// Returns all blogs and who they belong to. IF someone is logged in, they can like the blog, increasing it's like counter by 1. Implementing infinite scrolling here would be great.
export default function ExplorePage({ user }) {

  const [sorting, setSorting] = useState('Default')

  const { userLikedBlogs, loading, error } = useGetUserLikedBlogs(user)
  const { explorePageState, loadMoreButtonVisible, setPage } = useCreateExplorePage()

  if(loading) {
    return <LoadingSpinner message={'Loading data...'} />
  }

  if(error) {
    return <p>Error: {error.message}</p>
  }

  const ourPublicBlogs = explorePageState.map((blog) => blog)

  function compareBlogsByLikes(a, b) {
    return b.likes - a.likes
  }

  const getBlogsByLikes = ourPublicBlogs.sort(compareBlogsByLikes)

  const renderBlogsByLikes = (
    <ul>
      {getBlogsByLikes.map((blog) => (
        <ExploreBlog
          key={blog.id}
          blogObject={blog}
          user={user}
          getUserLikedBlogs={userLikedBlogs}
          showPostedBy={true}
          isIndividualPage={false}
          isRandomBlog={false}
        />
      ))}
    </ul>
  )

  const renderBlogsByDefault = (
    <ul>
      {explorePageState.map((blog) => (
        <ExploreBlog
          key={blog.id}
          blogObject={blog}
          user={user}
          getUserLikedBlogs={userLikedBlogs}
          showPostedBy={true}
          isIndividualPage={false}
          isRandomBlog={false}
        />
      ))}
    </ul>
  )

  const returnSortedPage = sorting === 'Default' ? renderBlogsByDefault : renderBlogsByLikes

// pagination function for the front page 'load more' button
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <div>
      <h1 style={{ color: 'black' }}>Front Page</h1>
      <h3  style={{ color: 'black' }}>Explore blogs posted by others and interact with them.</h3>
      <BasicSelect sorting={sorting} setSorting={setSorting} />
      {returnSortedPage}
      <Box display="flex" alignItems="center" justifyContent="center">

      {loadMoreButtonVisible && <Button variant="outlined" onClick={handleLoadMore} sx={{ fontWeight: '600', marginTop: '80px', minWidth: '30%', height: '60px', backgroundColor: 'white', color: 'black', border: 'solid 1px black' }}>Load More Blogs</Button>}

      {!loadMoreButtonVisible && <Alert severity="info" sx={{ marginTop: '40px', backgroundColor: '#1f1f54', color: 'white', fontSize: '18px', }}>No more blogs left to load in !</Alert>}
      </Box>
    </div>
  )
}
