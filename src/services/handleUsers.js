import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const getAllUsers = async () => {

    try {
        const response = await axios.get(baseUrl)
        console.log(response.data)
        return response.data
    } catch(err) {
        console.log(err)
    }
}

const getIndividualUser = async (userId) => {
    try {
       const response = await axios.get(`${baseUrl}/${userId}`)
       console.log(response)
       return response.data
    } catch(err) {
        console.log(err)
    }
}

export default { getAllUsers, getIndividualUser }