import axios from 'axios'
const blogsUrl = '/api/blogs'

let token

const setToken = (userToken) => token = userToken

const authUser = window.localStorage.getItem('bloglist-user')
if(authUser) {
  setToken(JSON.parse(authUser).token)
}

const getAll = async () => {
  const { data: blogs } = await axios.get(blogsUrl)
  return blogs
}

const getOne = async (id) => {
  const { data: blog } = await axios.get(`${blogsUrl}/${id}`)
  return blog
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
    .delete(`${blogsUrl}/${blogId}`, { headers: { Authorization: `Bearer ${token}` } })
}

const commentOne = async ( blogId, comment ) => {
  const { data: updatedBlog } = await axios
    .post(
      `${blogsUrl}/${blogId}/comments`,
      { comment }
    )
  return updatedBlog
}

export default { setToken, getAll, getOne, createOne, updateOne, commentOne, deleteOne }