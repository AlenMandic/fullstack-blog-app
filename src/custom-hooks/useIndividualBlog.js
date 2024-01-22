import { useState, useEffect } from 'react'
import blogService from '../services/handleBlogs'

export const useIndividualBlog = (blogId) => {

    const [blogInfo, setBlogInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        const getIndividualBlogInfo = async () => {

            try {
                setLoading(true)
                const response = await blogService.getIndividualBlog(blogId)

                if(response === 400 || response === 404) {
                    setLoading(false)
                    setError(true)
                    return null
                 }

                setBlogInfo(response)

            } catch(err) {
                setError(err.message)

            } finally {
                setLoading(false)
            }

        }

        getIndividualBlogInfo()

    }, [blogId])

    return { blogInfo, loading, error }

}