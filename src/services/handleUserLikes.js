import axios from 'axios'
let id = null

let token = null

// if the user is logged in, we get the token so we can use it for requests.
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// retrieve user's liked posts.
const getLikedPosts = async userId => {

  try {

    id = userId.username
    const baseUrl = `/users/${id}/likes`

    const response = await axios.get(baseUrl)
    return response.data

  } catch (err) {
    console.log(err)
  }
}

const handleLikeDislike = async (blog, type) => {

  const config = {
    headers: { Authorization: token }
  }

  const id = blog.id
  const newBlog = blog
  const baseUrl = `/blogs/${id}`

  if(type === 'like') {
    newBlog.likes += 1

    try {
      const response = await axios.put(baseUrl, newBlog, config)
      return response.data

    } catch (err) {
      console.log(err)
    }
  }

  newBlog.likes -= 1

  try {
    const response = await axios.put(baseUrl, newBlog, config)
    return response.data

  } catch (err) {
    console.log(err)
  }

}

export default { getLikedPosts, handleLikeDislike, setToken }