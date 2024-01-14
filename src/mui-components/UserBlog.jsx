import React from 'react'
import { Card, CardContent, Typography, IconButton, CardActions, Avatar, Link, Button, useMediaQuery, useTheme } from '@mui/material'
import { styled } from '@mui/system'
import DeleteIcon from '@mui/icons-material/Delete'

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

        <StyledAvatar sx={{ backgroundColor: 'black' }}>{authorInitials}</StyledAvatar>
        <StyledButton color="primary" sx={{ mr: '15px', fontSize: isSmallerWidth ? '16px': '22px', ml: '25px' }}>
          Likes: {blogObject.likes}
        </StyledButton>
        <Button
  color="primary"
  onClick={() => window.open(blogObject.url, '_blank')}
  variant="outlined"
  sx={{ display: { xs: 'none', sm: 'block' }, color: 'blue', }}
>
  View Blog
</Button>
<IconButton aria-label="delete" onClick={handleDeleteCallback}>
    <DeleteIcon sx={{ color: 'blue' }}/>
  </IconButton>
      </CardActions>
    </StyledCard>
  )
}

export default UserPostCard