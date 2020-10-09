require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}
console.log(process.argv)
if (process.argv.includes('local')) {
  MONGODB_URI = process.env.TEST_MONGODB_URI_LOCAL
}

module.exports = {
  MONGODB_URI,
  PORT
}