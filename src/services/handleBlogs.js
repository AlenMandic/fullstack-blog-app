import axios from 'axios'
const baseUrl = '/blogs'

let token = null

// if the user is logged in, we get the token so we can use it for requests.
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// load initial blogs and pagination support
const getAllBlogs = async ({ page, limit }) => {

  try {
    const response = await axios.get(baseUrl, {
      params: { page, limit },
    })
    return response.data

  } catch(err) {
    console.log(err)
  }
}

const getIndividualBlog = async (blogId) => {
   try {
    const response = await axios.get(`${baseUrl}/${blogId}`)
    return response.data

   } catch(err) {
    console.log(err)

    if(err.response.status === 404) {
      return err.response.status
  } else if(err.response.status === 400) {
      return err.response.status
     }

   }
}

// whenever our requests go to the protected routes which require authentication, we need to send an authorization header with our token along the request, token will be present on the front-end if the user is authenticated.
const addBlog = async blogData => {

  const config = {
    headers: { Authorization: token }
  }

  try {
    const response = await axios.post(baseUrl, blogData, config)
    return response

  } catch(err) {
    console.log(err)
  }
}

const deleteBlog = async blogId => {

  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${blogId}`

  try {
    const response = await axios.delete(url, config)
    return response

  } catch(err) {
    console.log(err)
  }
}
// for rendering user profile homepage
const getUserBlogs = async userInfo => {

  if (token !== null) {
    try {

      let userId
      userId = userInfo.username

      let userBlogsUrl = `/users/${userId}/blogs`

      const response = await axios.get(userBlogsUrl)

      const result = response.data.map(blog => blog)
      return result

    } catch(err) {
      console.error(err)
      alert(err.message)
      return []
    }
  }
  return []
}

// logged in users can add new comments to individual blog pages
const addBlogComment = async (blogId, commentObject) => {

  const config = {
    headers: { Authorization: token }
  }

  try {
    const response = await axios.post(`${baseUrl}/${blogId}/comments`, commentObject, config)
    return response.data

  } catch(err) {
    console.log(err)
  }

}

export default { setToken, addBlog, addBlogComment, getUserBlogs, getAllBlogs, getIndividualBlog, deleteBlog }