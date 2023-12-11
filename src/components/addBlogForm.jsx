import { React, useState } from 'react'
import blogService from '../services/handleBlogs'
import { NotificationError, NotificationSuccess } from './Notification'
export default function AddBlog({ updateUserPageState, user }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)
  const [notificationError, setNotificationError] = useState(null)
  const [notificationSuccess, setNotificationSuccess] = useState(null)
  const [showBlogForm, setShowBlogForm] = useState(false)

  function resetOurForm() {
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  }

  function showErrorNotification(message) {
    setNotificationError(message)

    setTimeout(() => {
      setNotificationError(null)
    }, 5000)
  }

  function showSuccessNotification(message) {
    setNotificationSuccess(message)

    setTimeout(() => {
      setNotificationSuccess(null)
    }, 5000)
  }

  const blogObject = {
    title: title,
    author: author,
    url: url,
    likes: likes,
  }

  async function handleBlogSubmit(e) {
    e.preventDefault()
    resetOurForm()
    try {
      const result = await blogService.addBlog(blogObject)

      updateUserPageState(result.data) // updates the state of our user and explore data with new post. addBlogForm -> App.jsx
      console.log('New blog posted by: ', user.username)

      setShowBlogForm(!showBlogForm)
      showSuccessNotification('Blog added successfully.')
      return result.data

    } catch(error) {
      console.log(error)
      showErrorNotification(error.message)
    }
  }

  function handleShowPostBlogForm() {
    setShowBlogForm(!showBlogForm)
  }

  function showPostBlogForm() {
    if(showBlogForm) {
      return (
        <>
          <NotificationError message={notificationError} />
          <NotificationSuccess message={notificationSuccess} />
          {' '}
          <h2>Save a new blog</h2>
          <form onSubmit={handleBlogSubmit}>
            <div>
            Title: <input type="text" name="title-input" minLength={5} maxLength={60} required value={title} onChange={({
                target
              }) => setTitle(target.value)}></input>
            </div>
            <div>
            Author: <input type="text" name="author-input" minLength={5} maxLength={60} required value={author} onChange={({
                target
              }) => setAuthor(target.value)}></input>
            </div>
            <div>
            URL: <input type="text" name="url-input" minLength={5} maxLength={100} required value={url} onChange={({
                target
              }) => setUrl(target.value)}></input>
            </div>
            <div>
            Likes: <input type="number" name="likes-input" required value={likes} onChange={({
                target
              }) => setLikes(target.value)}></input>
            </div>
            <div>
              <button type="submit">Save</button>
            </div>
          </form>
          <button onClick={handleShowPostBlogForm}>Hide</button>
        </>
      )
    } else {
      return <>
          <NotificationError message={notificationError} />
          <NotificationSuccess message={notificationSuccess} />
          <button onClick={handleShowPostBlogForm}>Post new blog</button>
      </>
    }
  }
  return showPostBlogForm()
}
