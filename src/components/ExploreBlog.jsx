import { useState, useEffect } from 'react'
import userLikeService from '../services/handleUserLikes'
import { Link } from 'react-router-dom'

export default function ExploreBlog({ blogObject, user, showPostedBy, enableLikeButton }) {

  const [showFullBlogs, setShowFullBlogs] = useState(false)
  const [userLikedBlogs, setUserLikedBlogs] = useState([])
  const [isLiked, setIsLiked] = useState(() => {
    const isThisLiked = userLikedBlogs.includes(blogObject.id)
    return isThisLiked
  })

// figure out which blogs have been liked by the user to handle like/dislike buttons
  useEffect(() => {
    const fetchUserLikedBlogs = async () => {

      try {
        if (user) {
          const result = await userLikeService.getLikedPosts(user)

          setUserLikedBlogs(result)
          setIsLiked(result.includes(blogObject.id))
        }

      } catch (error) {
        console.error('Error fetching user liked blogs:', error)
      }
    }

    fetchUserLikedBlogs()
  }, [user, blogObject.id])

  function handleShowBlogs() {
    setShowFullBlogs(!showFullBlogs)
  }

  async function handleBlogLike() {
    if (!user) {
      alert('Please log in to like blogs.')
      return null
    }

    console.log('Fire like service for: ', blogObject.id)
    setIsLiked(true)

    const result = await userLikeService.handleLikeDislike(blogObject, 'like')
    return result.data
  }

  async function handleBlogDislike() {
    if (!user) {
      alert('Please log in to like blogs.')
      return null
    }

    console.log('Fire dislike service for: ', blogObject.id)
    setIsLiked(false)

    const result = await userLikeService.handleLikeDislike(blogObject, 'dislike')
    return result.data
  }

  function showLikeButton() {
    if(!isLiked || user === null) {
      return <button onClick={handleBlogLike}>Like</button>
    }
    return <button onClick={handleBlogDislike}>Unlike</button>
  }

  function renderBlogs() {
    if(showFullBlogs) {
      return (
        <div className="full-blog">
          <h2>{blogObject.title}</h2>
          <h3>{blogObject.author}</h3>
          <a href="https://old.reddit.com/" target="_blank" rel="noreferrer">{blogObject.url}</a>
          <p>Likes: {blogObject.likes}</p>
          {showPostedBy && <p>Posted by: <Link to={`/users/${blogObject.postedBy.id}`}>{blogObject.postedBy.username}</Link></p>}
          {enableLikeButton && showLikeButton()}
          <button onClick={handleShowBlogs}>Hide</button>
        </div>
      )
    } else {
      return (
        <div className="half-blog">
          <h2>{blogObject.title}: </h2>
          <h2>{blogObject.author}</h2>
          <button onClick={handleShowBlogs}>View more</button>
        </div>
      )
    }
  }

  return renderBlogs()
}