import axios from 'axios'
const loginUrl = '/api/login'

const login = async (userData) => {
  try {
    const { data } = await axios
      .post(loginUrl, userData)
    return data
  } catch(error) {
    console.log(error)
    return error.response.data
  }
}

export default { login }