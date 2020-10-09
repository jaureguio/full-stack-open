import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
  const { data: users } = await axios.get(baseUrl)
  return users
}

const getOne = async ( id ) => {
  const { data: user } = await axios.get(`${baseUrl}/${id}`)
  return user
}

export default { getAll, getOne }