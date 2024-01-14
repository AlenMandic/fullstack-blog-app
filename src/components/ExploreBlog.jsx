import { React, useState, useEffect } from 'react'
import userLikeService from '../services/handleUserLikes'
import BlogPostCard from '../mui-components/ExploreBlog'

export default function ExploreBlog({ blogObject, user, getUserLikedBlogs, showPostedBy, enableLikeButton }) {

  const [userLikedBlogs, setUserLikedBlogs] = useState(getUserLikedBlogs)
  const [isLiked, setIsLiked] = useState(() => {

    if(!enableLikeButton) {
      return null
    }

    const isThisLiked = userLikedBlogs.includes(blogObject.id)
    return isThisLiked
  })

// figure out which blogs have been liked by the user to handle like/dislike buttons
useEffect(() => {

  if(!enableLikeButton) {
    return undefined
  }

  setUserLikedBlogs(getUserLikedBlogs)
  setIsLiked(getUserLikedBlogs.includes(blogObject.id))

}, [getUserLikedBlogs, blogObject.id])

  async function handleBlogLike() {
    if (!user) {
      alert('Please log in to like blogs.')
      return null
    }

    setIsLiked(true)

    const result = await userLikeService.handleLikeDislike(blogObject, 'like')
    return result.data
  }

  async function handleBlogDislike() {
    if (!user) {
      alert('Please log in to like blogs.')
      return null
    }

    setIsLiked(false)

    const result = await userLikeService.handleLikeDislike(blogObject, 'dislike')
    return result.data
  }

  return <BlogPostCard blogObject={blogObject} showPostedBy={showPostedBy} enableLikeButton={enableLikeButton} isLiked={isLiked} user={user} handleBlogLike={handleBlogLike} handleBlogDislike={handleBlogDislike} />
}