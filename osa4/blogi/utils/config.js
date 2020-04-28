require('dotenv').config()

let PORT = process.env.PORT
console.log(`running in ${process.env.NODE_ENV} mode`)
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}
if (process.env.NODE_ENV === 'development') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}
module.exports = {
  MONGODB_URI,
  PORT
}