import { useState, useEffect, React } from 'react'
import ExploreBlog from './ExploreBlog'
import BasicSelect from '../mui-components/SelectMenu'
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import Alert from '@mui/material/Alert'

// Returns all blogs and who they belong to. IF someone is logged in, they can like the blog, increasing it's like counter by 1. Implementing infinite scrolling here would be great.
export default function ExplorePage({ explorePageState, user, setPage, loadMoreButtonVisible, setLoadMoreButtonVisible }) {

  const [publicBlogs, setPublicBlogs] = useState([])
  const [sorting, setSorting] = useState('default')

  // When our prop 'explorePageState' changes, we render the explore page. This is because we have to wait until the async function resolves the data; we can't set the state directly from the prop here. The initial state of the explorePageState is [], and this effect will run only once when the state changes from [] to the resolved data.
  useEffect(() => {
    setPublicBlogs(explorePageState)
  }, [explorePageState])

  if (publicBlogs.length === 0) {
    return <p>No blogs posted yet.</p>
  }

  const ourPublicBlogs = publicBlogs.map((blog) => blog)

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
          showPostedBy={true}
          enableLikeButton={true}
        />
      ))}
    </ul>
  )

  const renderBlogsByDefault = (
    <ul>
      {publicBlogs.map((blog) => (
        <ExploreBlog
          key={blog.id}
          blogObject={blog}
          user={user}
          showPostedBy={true}
          enableLikeButton={true}
        />
      ))}
    </ul>
  )

  const returnSortedPage = sorting === 'default' ? renderBlogsByDefault : renderBlogsByLikes

// pagination function for the front page 'load more' button
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <div>
      <h1>Front Page</h1>
      <h3>Explore blogs posted by others and interact with them.</h3>
      <BasicSelect sorting={sorting} setSorting={setSorting} />
      {returnSortedPage}
      <Box display="flex" alignItems="center" justifyContent="center">

      {loadMoreButtonVisible && <Button variant="outlined" onClick={handleLoadMore} sx={{ fontWeight: '600', marginTop: '40px', minWidth: '30%', height: '60px' }}>Load More Blogs</Button>}

      {!loadMoreButtonVisible && <Alert severity="info" sx={{ marginTop: '40px', backgroundColor: '#1f1f54', color: 'white', fontSize: '18px', }}>No more blogs left to load in !</Alert>}
      </Box>
    </div>
  )
}
