import React from 'react'
import { Card, CardContent, Typography, IconButton, CardActions, Avatar, Link, Button, useMediaQuery, useTheme } from '@mui/material'
import { styled } from '@mui/system'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Link as RouterLink } from 'react-router-dom'

const StyledCard = styled(Card)({
  marginBottom: theme => theme.spacing(2),
})

const StyledAvatar = styled(Avatar)({
  marginRight: theme => theme.spacing(2),
})

const LikeButton = styled(IconButton)({
  color: 'blue',
  marginRight: theme => theme.spacing(2),
})

const DislikeButton = styled(IconButton)({
  color: 'blue',
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

const BlogPostCard = ({ blogObject, showPostedBy, enableLikeButton, isLiked, user, handleBlogLike, handleBlogDislike }) => {
  const authorInitials = getInitials(blogObject.author)
  const theme = useTheme()
  const isSmallerWidth = useMediaQuery(theme.breakpoints.down('sm'))

  function showLikeButton() {
    if(!isLiked || user === null) {
      return (<LikeButton color="primary" aria-label="Like" sx={{ mr: '15px' }} onClick={handleBlogLike}>
      <FavoriteBorderIcon sx={{ width: '40px', height: '40px', color: 'black' }}  />
    </LikeButton>)
    }
    return (<DislikeButton color="primary" aria-label="Like" sx={{ mr: '15px' }} onClick={handleBlogDislike}>
    <FavoriteIcon sx={{ width: '40px', height: '40px', color: 'black' }}  />
  </DislikeButton>)
  }

  return (
    <StyledCard sx={{ mb: '20px', ml: enableLikeButton ? '-50px' : null, border: 'solid 1px black' }}>
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

        {showPostedBy && <Typography variant="p" color="textSecondary">
        Posted by: <RouterLink to={`/api/users/${blogObject.postedBy.id}`}>{blogObject.postedBy.username}</RouterLink>
        </Typography>}

      </CardContent>
      <CardActions>

        {enableLikeButton && showLikeButton()}

        <StyledAvatar sx={{ backgroundColor: 'blue' }}>{authorInitials}</StyledAvatar>
        <StyledButton color="primary" sx={{ mr: '15px', fontSize: isSmallerWidth ? '16px': '22px', ml: enableLikeButton ? 'auto' : '25px', color: 'black' }}>
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
      </CardActions>
    </StyledCard>
  )
}

export default BlogPostCard