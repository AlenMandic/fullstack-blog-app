import React from 'react'
import { Card, CardContent, Typography, IconButton, CardActions, Avatar, Link, Button, useMediaQuery, useTheme, Box } from '@mui/material'
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

const getInitials = (name) => {
  const nameArray = name.split(' ')
  return nameArray.map(part => part.charAt(0)).join('')
}

const BlogPostCard = ({ blogObject, showPostedBy, isLiked, user, handleBlogLike, handleBlogDislike, isIndividualPage, commentLength, isRandomBlog }) => {

  const authorInitials = getInitials(blogObject.author)
  const theme = useTheme()
  const isSmallerWidth = useMediaQuery(theme.breakpoints.down('sm'))

  function showLikeButton() {
    if(!isLiked || user === null) {
      return (<LikeButton color="primary" aria-label="Like" sx={{ mr: '15px' }} onClick={handleBlogLike}>
      <FavoriteBorderIcon sx={{ width: '35px', height: '35px', color: 'black' }}  />
    </LikeButton>)
    }
    return (<DislikeButton color="primary" aria-label="Like" sx={{ mr: '15px' }} onClick={handleBlogDislike}>
    <FavoriteIcon sx={{ width: '35px', height: '35px', color: 'black' }}  />
  </DislikeButton>)
  }

  return (
    <StyledCard sx={{ mb: '20px', ml: '-45px', border: 'solid 1px black' }}>
      <CardContent>
        <Typography variant={isSmallerWidth ? 'h6' : 'h5'} component="div" sx={{ color: 'black' }}>
          {blogObject.title}
        </Typography>
        <Typography variant={isSmallerWidth ? 'h7' : 'h6' } color="textSecondary">
          by {blogObject.author}
        </Typography>
        <Typography variant="p" paragraph>
        <Link href={blogObject.url} target="_blank" rel="noopener noreferrer" color="primary" underline="always"  sx={{ color: 'blue' }}>
    {blogObject.url}
  </Link>
        </Typography>

        {showPostedBy && <Typography variant="p" color="textSecondary">
        Posted by: <RouterLink to={`/api/users/${blogObject.postedBy.id}`}>{blogObject.postedBy.username}</RouterLink>
        </Typography>}

      </CardContent>
      <CardActions>

        <StyledAvatar sx={{ backgroundColor: 'blue', mr: '20px' }}>{authorInitials}</StyledAvatar>
        {!isIndividualPage && <RouterLink to={`/api/blogs/${blogObject.id}`}>
<Button
  color="primary"
  variant="outlined"
  sx={{ color: 'black', fontWeight: '600', border: 'solid 1px black' }}
>
  View Post
</Button>
</RouterLink>}
      </CardActions>
      {!isRandomBlog && <Box sx={{ display: 'flex', alignItems: 'center' }}>{showLikeButton()}<Typography variant="h6" sx={{ ml: '-20px', color: 'black' }}>{blogObject.likes}</Typography>
<RouterLink to={`/api/blogs/${blogObject.id}`} style={{ textDecoration: 'none' }}><Typography variant="h6" sx={{ ml: '20px', my: '5px', cursor: 'pointer', color: 'black' }}>{commentLength} comments</Typography></RouterLink>
</Box>}
{isRandomBlog && <Box sx={{ display: 'flex', alignItems: 'center' }}><Typography variant="h6" sx={{ ml: '10px', color: 'black' }}>Likes: {blogObject.likes}</Typography>
<RouterLink to={`/api/blogs/${blogObject.id}`} style={{ textDecoration: 'none' }}><Typography variant="h6" sx={{ ml: '20px', my: '5px', cursor: 'pointer', color: 'black' }}>{commentLength} comments</Typography></RouterLink>
</Box>}
    </StyledCard>
  )
}

export default BlogPostCard