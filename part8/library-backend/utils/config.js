require('dotenv').config()

const { NODE_ENV, PORT, JWT_SECRET } = process.env

let MONGODB_URI = process.env.MONGODB_URI

if(NODE_ENV === 'development') {
  MONGODB_URI = process.env.DEV_MONGODB_URI
}
if(process.argv.includes('local')) {
  MONGODB_URI = process.env.DEV_MONGODB_URI_LOCAL
}

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_SECRET
}