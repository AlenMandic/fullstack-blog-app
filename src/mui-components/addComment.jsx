import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('')

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(event, comment)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginLeft: '-50px', minWidth: '16rem', maxWidth: '50%' }}>
      <TextField
        label="Add a comment"
        variant="outlined"
        multiline
        rows={2}
        fullWidth
        value={comment}
        onChange={handleCommentChange}
        sx={{ marginBottom: 2 }}
        inputProps={{ minLength: 3, maxLength: 200 }}
      />
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        sx={{ border: 'solid 1px black', color: 'black' }}
        disabled={!comment.trim()} // Disable button if the comment is empty or contains only whitespaces
      >
        Submit
      </Button>
    </form>
  )
}

export default CommentForm