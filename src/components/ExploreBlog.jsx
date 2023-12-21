import { React, useState, useEffect } from 'react'
import userLikeService from '../services/handleUserLikes'
import BlogPostCard from '../mui-components/ExploreBlog'

export default function ExploreBlog({ blogObject, user, showPostedBy, enableLikeButton }) {

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

  return <BlogPostCard blogObject={blogObject} showPostedBy={showPostedBy} enableLikeButton={enableLikeButton} isLiked={isLiked} user={user} handleBlogLike={handleBlogLike} handleBlogDislike={handleBlogDislike} />
}