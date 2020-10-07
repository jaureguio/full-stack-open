import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createOne = async (content) => {
  const anecdoteObj = { content, votes: 0 }
  const { data: newAnecdote } = await axios.post(baseUrl, anecdoteObj)
  return newAnecdote
}

const updateOne = async (updates) => {
  const { data: updatedAnecdote } = await axios.put(`${baseUrl}/${updates.id}`, updates)
  return updatedAnecdote
}

export default { getAll, createOne, updateOne }