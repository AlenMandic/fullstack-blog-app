import blogService from '../services/handleBlogs'
import detectLogoutService from '../services/autoLogout'
import { useState, useEffect } from 'react'

export const useUserProfile = (user, handleLogoutFunction) => {

    const [blogs, setUserBlogs] = useState([])
    const [loadingUserProfile, setLoading] = useState(false)
    const [errorUserProfile, setError] = useState(null)

    // If user is logged in, we render their blog posts. Also starts the logout detector service, and returns it's cleanup function.
  useEffect(() => {

    if (user) {

      const fetchUserBlogs = async () => {

        try {
          setLoading(true)
          const blogs = await blogService.getUserBlogs(user)
          setUserBlogs(blogs)

        } catch (err) {
          setError(err.message)
        } finally {
            setLoading(false)
        }
      }

      fetchUserBlogs()
      // starts the automatic logout detector. Doesn't work if closed browser, only inactivity while open/minimized.
      const cleanUpListeners = detectLogoutService(handleLogoutFunction)

      return cleanUpListeners
    }

  }, [user])

  return { blogs, setUserBlogs, loadingUserProfile, errorUserProfile }

}