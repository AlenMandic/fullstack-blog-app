import { React, useState } from 'react'
import blogService from '../services/handleBlogs'
import { NotificationError, NotificationSuccess } from './Notification'
import { Button, TextField, Typography } from '@mui/material'
import { showErrorNotification, showSuccessNotification } from '../utils'

export default function AddBlog({ updateUserPageState }) {

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

  const blogObject = { title, author, url, likes }

  async function handleBlogSubmit(e) {

    e.preventDefault()
    resetOurForm()

    try {
      const result = await blogService.addBlog(blogObject)

      updateUserPageState(result.data) // updates the state of our user and explore data with new post. addBlogForm -> App.jsx

      setShowBlogForm(!showBlogForm)
      showSuccessNotification('Blog added successfully.', setNotificationSuccess)
      return result.data

    } catch(error) {
      showErrorNotification(error.message, setNotificationError)
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
          <Typography variant="h5">Post a new blog</Typography>
          <form onSubmit={handleBlogSubmit}>
            <div>
            <TextField variant="filled" label="Title" type="text" name="title-input"  required value={title} onChange={({
                target
              }) => setTitle(target.value)}
               style={{ margin: '10px', borderRadius: '4px' }}
                inputProps={{
                minLength: '5',
                 maxLength: '60',
              }}></TextField>
            </div>
            <div>
            <TextField variant="filled" label="Author" type="text" name="author-input"  required value={author} onChange={({
                target
              }) => setAuthor(target.value)}
               style={{ margin: '10px' }}
                inputProps={{
                minLength: '5',
                 maxLength: '60'
              }}></TextField>
            </div>
            <div>
            <TextField variant="filled" label="URL" type="text" name="url-input"  required value={url} onChange={({
                target
              }) => setUrl(target.value)}
               style={{ margin: '10px' }}
                inputProps={{
                minLength: '5',
                 maxLength: '100'
              }}></TextField>
            </div>
            <div>
            <TextField variant="filled" label="Likes" type="number" name="likes-input" value={likes} onChange={({
                target
              }) => setLikes(target.value)}
               style={{ margin: '10px' }}
                inputProps={{
                minLength: '5',
                 maxLength: '60'
              }}></TextField>
            </div>
            <div>
              <Button variant="outlined" type="submit" sx={{ fontWeight: '600', my: '15px', border: 'solid 1px black', color: 'black' }}>Post</Button>
            </div>
          </form>
          <Button variant="outlined" onClick={handleShowPostBlogForm} sx={{ fontWeight: '600', border: 'solid 1px black', color: 'black' }}>Cancel</Button>
        </>
      )
    } else {
      return <>
          <NotificationError message={notificationError} />
          <NotificationSuccess message={notificationSuccess} />
          <Button variant="outlined" onClick={handleShowPostBlogForm} sx={{ fontWeight: '600', width: '250px', height: '60px', marginBottom: '30px', border: 'solid 1px black', color: 'black' }}>Post a new blog</Button>
            </>
    }
  }
  return showPostBlogForm()
}
