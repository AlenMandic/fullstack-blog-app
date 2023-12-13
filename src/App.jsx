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
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import detectLogoutService from './services/utils'

export default function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setUserBlogs] = useState([])
  const [notificationError, setNotificationError] = useState(null)
  const [notificationSuccess, setNotificationSuccess] = useState(null)
  const [explorePageState, setExplorePageState] = useState([])
  const [showUserPosts, setShowUserPosts] = useState(true)

  // Renders and set's the "explore page", this goes to ExplorePage.jsx. Whenever a new post is made with addBlogForm, this gets updated, and then finally ExplorePage.
  useEffect(() => {
    const createExplorePage = async () => {
      try {
        const explorePageState = await blogService.getAllBlogs()
        setExplorePageState(explorePageState)

      } catch(err) {
        console.error('error fetching initial blogs for explore page: ', err)
      }
    }
    createExplorePage()
  }, [])

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
          console.log(err)
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
      const user = await loginService.login({ username, password }) // should return user: username, name, token

      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      userLikesService.setToken(user.token)
      setUsername('')
      setPassword('')
      showSuccessNotification('Logged in successfully.')

    } catch (err) {
      showErrorNotification('Login failed. Verify login details.')
      console.log(err)
      resetForm()
    }
  }
  // updates user blogs and the explore page when a user deletes one of his blogs.
  async function handleDelete(ourBlog) {
    const confirm = window.confirm(`Are you sure you want to delete ${ourBlog.title}`)

    if(confirm) {

      const deleteBlog = await blogService.deleteBlog(ourBlog.id)
      console.log(deleteBlog)

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
    console.log('User logged out.')
  }

  function handleUserPosts() {
    if(showUserPosts) {
      return (
        <div>
          <button onClick={toggleUserPosts}>Hide posts</button>
          <ul>{blogs.map((blog) => (<UserBlog key={blog.id} blogObject={blog} handleDeleteCallback={handleDelete}/>))}</ul>
        </div>
      )
    } else {
      return <button onClick={toggleUserPosts}>Show your posts</button>
    }
  }

  function toggleUserPosts() {
    setShowUserPosts(!showUserPosts)
  }

  return (
    <>
      <NotificationError message={notificationError} />
      <NotificationSuccess message={notificationSuccess} />

      <Router>
       <div>
        <Link style={{ padding: '10px' }} to="/">Home</Link>
        <Link style={{ padding: '10px' }} to="/blogs">Front Page</Link>
        <Link style={{ padding: '10px' }} to="/users">Users</Link>
        {!user && <Link style={{ padding: '10px' }} to="/login">Log in</Link>}
        {!user && <Link style={{ padding: '10px' }} to="/register">Create account</Link>}
        {user && <button onClick={handleLogout}>Log out</button>}
        {user && (<h2>Logged in as {user.name}</h2>)}
       </div>

        <Routes>

          <Route path="/" element={
           <>
           <h1>Welcome to SnapBlog, a blog sharing site!</h1>
           <h3>Share and save your favorite blog posts with others.</h3>
            {!user && <div><p>Log in to post new blogs or view your saved blogs right here.</p></div>}
            {user && (<div>{<AddBlog updateUserPageState={handleBlogSubmitCallback} user={user}/>}<h1>Your blogs</h1>{handleUserPosts()}</div>)}
             <Link style={{ padding: '5px' }} to="/blogs">View blogs posted by others</Link></>}/>

          <Route path="/blogs" element={<ExplorePage explorePageState={explorePageState} user={user}/>}/>

          <Route path="/users" element={<UsersPage />}/>

          <Route path="/users/:userId" element={<UserPage user={user} />}/>

          <Route path="/login" element={<CreateLoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>}/>

          <Route path="/register" element={<CreateSignUpForm />}/>

        </Routes>

      </Router>

      <footer>
      <h3>Thanks for browsing through SnapBlog. We hope you enjoyed your stay and found interesting blogs! 😄</h3>
      </footer>
    </>
  )
}
