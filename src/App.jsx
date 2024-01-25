// Material UI imports
import Container from '@mui/material/Container'
import ResponsiveHeader from './mui-components/Header'
import StickyFooter from './mui-components/Footer'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { Button } from '@mui/material'
import LoadingSpinner from './mui-components/LoadingSpinner'

// Regular imports
import './style.css'
import { showErrorNotification, showSuccessNotification } from './utils'
import { useState, useEffect } from 'react'
import loginService from './services/handleSignUpLogin'
import blogService from './services/handleBlogs'
import userLikesService from './services/handleUserLikes'
import AddBlog from './components/AddBlogForm'
import CreateLoginForm from './components/CreateLoginForm'
import UserBlog from './components/UserBlog'
import { NotificationError, NotificationSuccess, } from './components/Notification'
import ExplorePage from './components/ExplorePage'
import ExploreBlog from './components/ExploreBlog'
import UsersPage from './components/UsersPage'
import UserPage from './components/IndividualUser'
import CreateSignUpForm from './components/CreateSignupForm'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import UnknownRoute from './components/UnknownRoute'
import { useCreateExplorePage } from './custom-hooks/useCreateExplorePage'
import { useUserProfile } from './custom-hooks/useUserProfile'
import { useGetUserLikedBlogs } from './custom-hooks/useGetUserLikedBlogs'
import IndividualBlogPage from './components/IndividualBlog'

export default function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationError, setNotificationError] = useState(null)
  const [notificationSuccess, setNotificationSuccess] = useState(null)
  const [showUserPosts, setShowUserPosts] = useState(true)

  // If user is logged in on their ususal device: retrieve the user once on mount and store it. Give token to relevant services.
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInBlogAppUser')

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
      userLikesService.setToken(user.token)
    }
  }, [])

  // custom hook which renders out and handles data for the Front Page page.
  const { explorePageState, setExplorePageState, loading, error } = useCreateExplorePage()
  // custom hook for logged in user and automatic logout detector
  const { blogs, setUserBlogs, loadingUserProfile, errorUserProfile } = useUserProfile(user, handleLogout)
// custom hook to ensure displaying a random blog post works
  const { userLikedBlogs } = useGetUserLikedBlogs(user)

  if(loading) {
    return <LoadingSpinner message={'Loading data...'} />
  } else if(error) {
    return <p>Error: {error.message}</p>
  }

  if(loadingUserProfile) {
    return <LoadingSpinner message={'Loading your profile...'} />
  } else if (errorUserProfile) {
    return <p>Error: {errorUserProfile.message}</p>
  }

  function resetForm() {
    setUsername('')
    setPassword('')
    setUserBlogs([])
    setUser(null)
    localStorage.removeItem('loggedInBlogAppUser')
  }

  // updates Homepage and Explore page state when a user adds a new post from addBlogForm.jsx
  function handleBlogSubmitCallback(blogObject) {
    const oldUserBlogs = blogs

    setUserBlogs(oldUserBlogs.concat(blogObject))
  }

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password }) // should return user: username, name, id, token

      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      userLikesService.setToken(user.token)
      setUsername('')
      setPassword('')
      showSuccessNotification('Logged in successfully.', setNotificationSuccess)

    } catch (err) {
      showErrorNotification('Login failed. Verify login details.', setNotificationError)
      resetForm()
    }
  }
  // updates user blogs and the explore page when a user deletes one of his blogs.
  async function handleDelete(ourBlog) {
    const confirm = window.confirm(`Are you sure you want to delete "${ourBlog.title}"`)

    if(confirm) {

      const deleteBlog = await blogService.deleteBlog(ourBlog.id)

      const updatedUserBlogs = blogs.filter(blog => blog.id !== ourBlog.id)
      const updatedExplorePageBlogs = explorePageState.filter(blog => blog.id !== ourBlog.id)
      setUserBlogs(updatedUserBlogs)
      setExplorePageState(updatedExplorePageBlogs)

      return deleteBlog.data

    } else {
      return null
    }
  }

  function handleLogout() {
    setUser(null)
    blogService.setToken(null)
    userLikesService.setToken(null)
    resetForm()
  }

  function handleUserPosts() {
    if(showUserPosts) {
      return (
        <div>
          <Button variant="outlined" onClick={toggleUserPosts} sx={{ fontWeight: '600', border: 'solid 1px black', color: 'black' }}>Hide posts</Button>
          <ul>{blogs.map((blog) => (<UserBlog key={blog.id} blogObject={blog} handleDeleteCallback={handleDelete}/>))}</ul>
        </div>
      )
    } else {
      return <Button variant="outlined" onClick={toggleUserPosts} sx={{ fontWeight: '600', border: 'solid 1px black', color: 'black' }}>Show your posts</Button>
    }
  }

  function toggleUserPosts() {
    setShowUserPosts(!showUserPosts)
  }

  function displayRandomBlog() {

     const randomBlogIndex = Math.floor(Math.random() * 10)
     const randomBlog = explorePageState[randomBlogIndex]

     return <Container sx={{ ml: '20px' }}>
      <Typography variant="h5" sx={{ color: 'black', mb: '20px', ml: '-45px' }}>Explore a random blog post</Typography>
     <ExploreBlog
     blogObject={randomBlog}
     user={user}
     getUserLikedBlogs={userLikedBlogs}
     showPostedBy={true}
     isIndividualPage={false}
     />
    </Container>
  }

  return (
    <>
      <Container sx={{ minHeight: '100vh', }}>
      <NotificationError message={notificationError} />
      <NotificationSuccess message={notificationSuccess} />

      <Router>
       <div>
       <ResponsiveHeader user={user} handleLogout={handleLogout} />
        {user && (<Alert severity="info" style={{ backgroundColor: '#1f1f54', color: 'white' }}>Logged in as <strong>{user.name}</strong></Alert>)}
       </div>

        <Routes>

          <Route path="/" element={
           <>

           <h1 style={{ color: 'black' }}>Welcome to SnapBlog, a blog sharing site!</h1>
           <h3 style={{ color: 'black' }}>Share and save your favorite blog posts with others.</h3>
           <Link to="/api/blogs">
              <Typography variant="h5" sx={{ my: '35px', color: 'black' }}>Browse the Front Page 🌍</Typography>
              </Link>
            {!user && <div><Alert severity="info" sx={{ backgroundColor: '#1f1f54', color: 'white', fontSize: '18px', my: '40px' }}><strong><Link to="/api/login" style={{ color: 'white', marginRight: '5px' }}>Log in </Link>  </strong>to be able to post and like other blogs!<br></br>Your profile will appear here.</Alert></div>}
            {displayRandomBlog()}
            {user && (<div>{<AddBlog updateUserPageState={handleBlogSubmitCallback} user={user}/>}<h1>Your blogs</h1>{handleUserPosts()}</div>)}
              </>}
             />

          <Route path="/api/blogs" element={<ExplorePage user={user}/>}/>

          <Route path="/api/users" element={<UsersPage />}/>

          <Route path="/api/users/:userId" element={<UserPage user={user} />}/>

          <Route path="/api/blogs/:blogId" element={<IndividualBlogPage user={user} />}/>

          <Route path="/api/login" element={!user ? <CreateLoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} user={user} /> : <Navigate to="/" />} />

          <Route path="/api/register" element={!user ? <CreateSignUpForm user={user} showSuccessMessageCallback={showSuccessNotification} setNotificationSuccess={setNotificationSuccess} /> : <Navigate to="/" /> } />

          <Route path="*" element={<UnknownRoute />} />

        </Routes>

      </Router>

      <StickyFooter />

      </Container>

    </>
  )
}
