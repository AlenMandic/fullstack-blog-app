import UserPostCard from '../mui-components/UserBlog'

export default function UserBlog({ blogObject, handleDeleteCallback }) {

  function handleDelete() {
    handleDeleteCallback(blogObject)
  }

    return <UserPostCard blogObject={blogObject} handleDeleteCallback={handleDelete} />
}