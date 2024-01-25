import React from 'react'
import { Avatar, Box, Typography, Paper } from '@mui/material'
import { Link } from 'react-router-dom'

export default function CommentPost ({ comment }) {
  return (
    <Paper
      sx={{
        padding: 2,
        marginTop: 2,
        ml: '-45px',
        minWidth: '21rem',
        maxWidth: '70%',
      }}
      elevation={2}
    >
      <Box display="flex" alignItems="center">
        <Avatar sx={{ marginRight: 1 }}>{comment.postedBy.username.charAt(0).toUpperCase()}</Avatar>
        <Link to={`/api/users/${comment.postedBy.id}`} style={{ textDecoration: 'none' }}>
        <Typography variant="subtitle1">{comment.postedBy.username}</Typography>
        </Link>
      </Box>
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        {comment.commentContent}
      </Typography>
    </Paper>
  )
}
