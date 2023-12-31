// Material UI imports
import Container from '@mui/material/Container'
import ResponsiveHeader from './mui-components/Header'
import StickyFooter from './mui-components/Footer'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { Button } from '@mui/material'

// Regular imports
import './style.css'
import { useState, useEffect } from 'react'
import loginService from './services/handleSignUpLogin'
import blogService from './services/handleBlogs'
import userLikesService from './services/handleUserLikes'
import AddBlog from './components/AddBlogForm'
import CreateLoginForm from './components/CreateLoginForm'
import UserBlog from './components/UserBlog'
import { NotificationError, NotificationSuccess, } from './components/Notification'
import ExplorePage from './components/ExplorePage'
import UsersPage from './components/UsersPage'
import UserPage from './components/UserPage'
import CreateSignUpForm from './components/CreateSignupForm'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import detectLogoutService from './services/handleLogout'
import UnknownRoute from './components/UnknownRoute'

export default function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setUserBlogs] = useState([])
  const [notificationError, setNotificationError] = useState(null)
  const [notificationSuccess, setNotificationSuccess] = useState(null)
  const [explorePageState, setExplorePageState] = useState([])
  const [page, setPage] = useState(1) // initial front page blogs pagination.
  const [showUserPosts, setShowUserPosts] = useState(true)
  const [loadMoreButtonVisible, setLoadMoreButtonVisible] = useState(true)

  // Renders and set's the "explore page", this goes to ExplorePage.jsx. Whenever a new post is made with addBlogForm,, this get's updated. Pagination implemented.
  useEffect(() => {
    const createExplorePage = async () => {
      try {
        const response = await blogService.getAllBlogs({ page, limit: 5 })

        if(page === 1) {
          setExplorePageState(response)
          return null

        } else {
          setExplorePageState((prevExplorePageState) => [
            ...prevExplorePageState,
            ...response,
          ])
        }

        if (response.length < 5) {
          setLoadMoreButtonVisible(false)
        } else {
          setLoadMoreButtonVisible(true)
        }

      } catch(err) {
        console.error('error fetching initial blogs for explore page: ', err)
      }
    }

    createExplorePage()
  }, [page])

  // If user is logged in: retrieve the user once on mount and store it. Give token to relevant services.
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInBlogAppUser')

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
      userLikesService.setToken(user.token)
    }
  }, [])

  // If user is logged in, we render their blog posts.
  useEffect(() => {
    if (user) {
      const fetchUserBlogs = async () => {
        try {
          const blogs = await blogService.getUserBlogs(user)
          setUserBlogs(blogs)

        } catch (err) {
          showErrorNotification(err.message)
        }
      }
      fetchUserBlogs()
    }
  }, [user])

  // automatic inactivity/logout detection service which starts upon login.
  useEffect(() => {

    if(user) {
      const cleanUpListeners = detectLogoutService(handleLogout)

      return cleanUpListeners
    }

  }, [user])

  function resetForm() {
    setUsername('')
    setPassword('')
    setUserBlogs([])
    setUser(null)
    localStorage.removeItem('loggedInBlogAppUser')
  }

  function showErrorNotification(message) {
    setNotificationError(message)

    setTimeout(() => {
      setNotificationError(null)
    }, 5000)
  }

  function showSuccessNotification(message) {
    setNotificationSuccess(message)

    setTimeout(() => {
      setNotificationSuccess(null)
    }, 5000)
  }

  // updates Homepage and Explore page state when a user adds a new post from addBlogForm.jsx
  function handleBlogSubmitCallback(blogObject) {
    const oldUserBlogs = blogs
    const oldExploreBlogs = explorePageState

    setUserBlogs(oldUserBlogs.concat(blogObject))
    setExplorePageState(oldExploreBlogs.concat(blogObject))
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
      showSuccessNotification('Logged in successfully.')

    } catch (err) {
      showErrorNotification('Login failed. Verify login details.')
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
          <Button variant="outlined" onClick={toggleUserPosts} sx={{ fontWeight: '600' }}>Hide posts</Button>
          <ul>{blogs.map((blog) => (<UserBlog key={blog.id} blogObject={blog} handleDeleteCallback={handleDelete}/>))}</ul>
        </div>
      )
    } else {
      return <Button variant="outlined" onClick={toggleUserPosts} sx={{ fontWeight: '600' }}>Show your posts</Button>
    }
  }

  function toggleUserPosts() {
    setShowUserPosts(!showUserPosts)
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

           <h1>Welcome to SnapBlog, a blog sharing site!</h1>
           <h3 style={{ marginBottom: '76px' }}>Share and save your favorite blog posts with others.</h3>
            {!user && <div><Alert severity="info" style={{ backgroundColor: '#1f1f54', color: 'white', fontSize: '18px' }}><strong><Link to="/api/login" style={{ color: 'white', marginRight: '5px' }}>Log in </Link>  </strong>to be able to post and like other blogs!<br></br>Your posts will appear here.</Alert></div>}
            {user && (<div>{<AddBlog updateUserPageState={handleBlogSubmitCallback} user={user}/>}<h1>Your blogs</h1>{handleUserPosts()}</div>)}
             <Link to="/api/blogs">
              <Typography variant="h5" sx={{ my: '98px', color: 'white' }}>Front Page 🌍</Typography>
              </Link></>}
             />

          <Route path="/api/blogs" element={<ExplorePage explorePageState={explorePageState} user={user} page={page} setPage={setPage} loadMoreButtonVisible={loadMoreButtonVisible} setLoadMoreButtonVisible={setLoadMoreButtonVisible}/>}/>

          <Route path="/api/users" element={<UsersPage />}/>

          <Route path="/api/users/:userId" element={<UserPage user={user} />}/>

          <Route path="/api/login" element={!user ? <CreateLoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} user={user} /> : <Navigate to="/" />} />

          <Route path="/api/register" element={!user ? <CreateSignUpForm user={user} showSuccessMessageCallback={showSuccessNotification} /> : <Navigate to="/" /> } />

          <Route path="*" element={<UnknownRoute />} />

        </Routes>

      </Router>

      <StickyFooter />

      </Container>

    </>
  )
}
