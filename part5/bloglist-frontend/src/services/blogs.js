import axios from 'axios'
const blogsUrl = '/api/blogs'

let token

const setToken = (userToken) => token = userToken

const getAll = async () => {
  const { data } = await axios.get(blogsUrl)
  return data
}

const createOne = async ( blogData ) => {
  const { data: newBlog } = await axios
    .post(blogsUrl, blogData, { headers: { Authorization: `Bearer ${token}` } })
  return newBlog
}

const updateOne = async ( blogData ) => {
  const { data: updatedBlog } = await axios
    .put(
      `${blogsUrl}/${blogData.id}`,
      blogData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  return updatedBlog
}

const deleteOne = async ( blogId ) => {
  await axios
    .delete(`${blogsUrl}/${blogId}`, { headers: { Authorization: `Bearer ${token}`}})
}

export default { setToken, getAll, createOne, updateOne, deleteOne }