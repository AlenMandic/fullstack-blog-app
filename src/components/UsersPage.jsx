import { Link } from 'react-router-dom'
import { List, ListItemButton, ListItemText } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useGetUsers } from '../custom-hooks/useGetUsers'
import LoadingSpinner from '../mui-components/LoadingSpinner'

export default function UsersPage() {

const { users, loading, error } = useGetUsers()

if(loading) {
  return <LoadingSpinner message={'Loading users...'} />
}

if (error) {
  return <p>Error: {error.message}</p>
}

const ourUsers = <List>
{users.map((user) => (
  <ListItemButton key={user.id} component={Link} to={`/api/users/${user.id}`} sx={{ textDecoration: 'none', borderRadius: '4px', color: 'black', '&:hover': { backgroundColor: 'black', color: 'white' }  }}>
    <ListItemText primary={<Typography variant="subtitle2" component="div" sx={{ fontSize: '20px' }}>
          <span>{user.name}</span>
          <span> - Posted</span>
          <span style={{ marginLeft: '4px', fontSize: '30px' }}>{user.blogs.length}</span>
          <span> blogs</span>
        </Typography>} />
  </ListItemButton>
))}
</List>

    return (
    <>
    <h1>Welcome to our users page.</h1>
    <p>View individual user profiles and their posts.</p>
    {ourUsers}
    </>
)
}