import axios from 'axios'
const DBURL = 'http://localhost:3001/people'

const getAll = () => 
  axios
    .get(DBURL)
    .then(({ data }) => data)

const createOne = newData => 
  axios
    .post(DBURL, newData)
    .then(({ data }) => data)

const updateOne = (id, newData) => 
  axios
    .put(`${DBURL}/${id}`, newData)
    .then(({ data }) => data)

const deleteOne = id => 
  axios
    .delete(`${DBURL}/${id}`)

export default { getAll, createOne, updateOne, deleteOne }