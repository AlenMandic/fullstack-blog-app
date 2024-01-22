import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'

export default function CommentForm ({ onSubmit }) {
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
    <form onSubmit={handleSubmit} style={{ marginLeft: '-45px', minWidth: '16rem', maxWidth: '50%' }}>
      <TextField
        label="Add a comment"
        variant="filled"
        multiline
        rows={2}
        fullWidth
        value={comment}
        onChange={handleCommentChange}
        sx={{ marginBottom: 2, border: 'solid 1px black', borderRadius: '4px' }}
        inputProps={{ minLength: 3, maxLength: 200 }}
      />
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        sx={{ border: 'solid 1px black', color: 'black' }}
      >
        Submit
      </Button>
    </form>
  )
}