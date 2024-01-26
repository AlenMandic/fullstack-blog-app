import { useState, useEffect } from 'react'
import blogService from '../services/handleBlogs'

export const useCreateExplorePage = () => {

    const [explorePageState, setExplorePageState] = useState([])
    const [loadMoreButtonVisible, setLoadMoreButtonVisible] = useState(true)
    const [page, setPage] = useState(1) // initial front page blogs pagination.
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        const createExplorePage = async () => {

          try {
            setLoading(true)
            const response = await blogService.getAllBlogs({ page, limit: 10 })

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
            setError(err.message)
          } finally {
            setLoading(false)
          }
        }

        createExplorePage()

      }, [page])

      return { explorePageState, setExplorePageState, loadMoreButtonVisible, setLoadMoreButtonVisible, page, setPage, loading, error }
}