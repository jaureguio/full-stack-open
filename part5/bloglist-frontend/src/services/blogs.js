import axios from 'axios'
const blogsUrl = '/api/blogs'

const getAll = async () => {
  const { data } = await axios.get(blogsUrl)
  return data
}

const createOne = async (blogData, token) => {
  const { data: newBlog } = await axios
    .post(blogsUrl, blogData, { headers: { Authorization: `Bearer ${token}` } })
  return newBlog
}

export default { getAll, createOne }