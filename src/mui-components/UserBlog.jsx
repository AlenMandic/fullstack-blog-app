import React from 'react'
import { Card, CardContent, Typography, IconButton, CardActions, Avatar, Link, Button, useMediaQuery, useTheme, Box } from '@mui/material'
import { styled } from '@mui/system'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link as RouterLink } from 'react-router-dom'

const StyledCard = styled(Card)({
  marginBottom: theme => theme.spacing(2),
})

const StyledAvatar = styled(Avatar)({
  marginRight: theme => theme.spacing(2),
})

const StyledButton = styled(IconButton)({
  color: 'blue',
  marginLeft: 'auto',
})

const getInitials = (name) => {
  const nameArray = name.split(' ')
  return nameArray.map(part => part.charAt(0)).join('')
}

const UserPostCard = ({ blogObject, handleDeleteCallback }) => {
  const authorInitials = getInitials(blogObject.author)
  const theme = useTheme()
  const isSmallerWidth = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <StyledCard sx={{ mb: '20px', ml: '-50px', border: 'solid 1px black' }}>
      <CardContent>
        <Typography variant={isSmallerWidth ? 'h6' : 'h4'} component="div">
          {blogObject.title}
        </Typography>
        <Typography variant={isSmallerWidth ? 'h7' : 'h6' } color="textSecondary">
          by {blogObject.author}
        </Typography>
        <Typography variant="p" color="textSecondary" paragraph>
        <Link href={blogObject.url} target="_blank" rel="noopener noreferrer" color="primary" underline="always">
    {blogObject.url}
  </Link>
        </Typography>

       </CardContent>
      <CardActions>

<Button aria-label="delete" onClick={handleDeleteCallback} startIcon={<DeleteIcon />} sx={{ color: 'black', mr: '5px', border: 'solid 1px black' }} variant="outlined">Delete</Button>
  <RouterLink to={`/api/blogs/${blogObject.id}`}>
  <Button
  color="primary"
  variant="outlined"
  sx={{ color: 'black', fontWeight: '600', border: 'solid 1px black' }}
>
  View Post
</Button>
  </RouterLink>
      </CardActions>
      <Box sx={{ display: 'flex' }}>
      <StyledAvatar sx={{ backgroundColor: 'blue', m: '10px' }}>{authorInitials}</StyledAvatar>
      <StyledButton color="primary" sx={{ fontSize: isSmallerWidth ? '16px': '22px', ml: '0px', color:'black' }}>
          Likes: {blogObject.likes}
        </StyledButton>
      </Box>
    </StyledCard>
  )
}

export default UserPostCard