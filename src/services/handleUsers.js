import axios from 'axios'
const baseUrl = '/users'

const getAllUsers = async () => {

    try {
        const response = await axios.get(baseUrl)
        return response.data

    } catch(err) {
        console.log(err)
    }
}

const getIndividualUser = async (userId) => {

    try {

       const response = await axios.get(`${baseUrl}/${userId}`)
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

export default { getAllUsers, getIndividualUser }